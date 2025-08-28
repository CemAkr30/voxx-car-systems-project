import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import type { Firma } from "@/schemas/firma";
import { formatDate } from "@/lib/utils";
import FirmaDialog from "@/components/web/firma/firma-dialog";
import FirmaSilDialog from "@/components/web/firma/firma-sil-dialog";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { WebSocketMessage } from "@/types";
import { useWebSocketTopic } from "@/hooks/use-webhook";
import { toast } from "sonner";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedFirma?: Firma;
}

export const Route = createFileRoute("/_authenticated/firma/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(getFirmalarQueryOptions()),
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();

	useWebSocketTopic<WebSocketMessage>({
		topic: "/topic/firma",
		onMessage: async ({ type }) => {
			if (type === "CREATED") {
				toast.success("Firma başarılı bir şekilde kayıt edildi");
			}
			if (type === "UPDATED") {
				toast.success("Firma başarılı bir şekilde güncellendi");
			}
			if (type === "DELETED") {
				toast.success("Firma başarılı bir şekilde silindi");
			}
			await queryClient.invalidateQueries(getFirmalarQueryOptions());
		},
	});

	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: firmalar = [] } = useSuspenseQuery(getFirmalarQueryOptions());

	const openDialog = (type: keyof DialogState, firma?: Firma) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedFirma: firma,
		});
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
		// Clear selected items when closing delete dialog
		if (dialogState.delete) {
			setSelectedItems([]);
		}
		// Close all dropdowns after dialog operations
		setOpenDropdowns(new Set());
	};

	const handleDropdownOpenChange = (firmaId: string, open: boolean) => {
		setOpenDropdowns((prev) => {
			const newSet = new Set(prev);
			if (open) {
				newSet.add(firmaId);
			} else {
				newSet.delete(firmaId);
			}
			return newSet;
		});
	};

	const handleBulkDelete = () => {
		setDialogState({
			create: false,
			update: false,
			delete: true,
			selectedFirma: undefined,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Firma Yönetimi</h1>
				<p className="text-gray-600 mt-2">Araç firmalarını yönetin</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Firma Listesi</CardTitle>
						<div className="flex items-center space-x-2">
							<Button onClick={() => openDialog("create")}>
								Yeni Firma Ekle
							</Button>
							{/* <DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										<Download className="h-4 w-4 mr-2" />
										Dışa Aktar
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
								</DropdownMenuContent>
							</DropdownMenu> */}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mb-6">
						{/* <div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<Input
									placeholder="Firma ara..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 w-64"
								/>
							</div>
							<Button variant="outline" size="sm">
								<Filter className="h-4 w-4 mr-2" />
								Filtreler
							</Button>
							<Button variant="outline" size="sm">
								<RefreshCw className="h-4 w-4 mr-2" />
								Yenile
							</Button>
						</div> */}

						{selectedItems.length > 0 && (
							<div className="flex items-center space-x-2">
								<Badge variant="secondary">
									{selectedItems.length} öğe seçili
								</Badge>
								<Button
									variant="destructive"
									size="sm"
									onClick={handleBulkDelete}
								>
									Seçilenleri Sil
								</Button>
							</div>
						)}
					</div>

					{/* Table */}
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Firma Adı</TableHead>
									<TableHead>Oluşturulma Tarihi</TableHead>
									<TableHead>Güncellenme Tarihi</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{firmalar.map((firma: Firma) => (
									<TableRow key={firma.id}>
										<TableCell className="font-medium">
											<Link
												to="/firma/$firmaId/detay"
												params={{ firmaId: firma.id }}
											>
												{firma.unvan}
											</Link>
										</TableCell>
										<TableCell>{formatDate(firma.createdAt)}</TableCell>
										<TableCell>{formatDate(firma.updatedAt)}</TableCell>
										<TableCell>
											<DropdownMenu
												open={openDropdowns.has(firma.id)}
												onOpenChange={(open) =>
													handleDropdownOpenChange(firma.id, open)
												}
											>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="flex flex-col gap-1 p-1">
													<Button
														variant="ghost"
														size="sm"
														className="justify-start"
														onClick={() => openDialog("update", firma)}
													>
														Düzenle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => openDialog("delete", firma)}
													>
														Sil
													</Button>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Dialogs */}
			{dialogState.create && (
				<FirmaDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
				/>
			)}

			{dialogState.update && dialogState.selectedFirma && (
				<FirmaDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedFirma}
				/>
			)}

			{dialogState.delete && (
				<FirmaSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedFirma={dialogState.selectedFirma!}
				/>
			)}
		</div>
	);
}
