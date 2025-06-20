import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import AdresDialog from "@/components/web/adres/adres-dialog";
import AdresSilDialog from "@/components/web/adres/adres-sil-dialog";
import { formatDate } from "@/lib/utils";
import type { Adres } from "@/schemas/adres";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { createFileRoute } from "@tanstack/react-router";
import {
	Download,
	Search,
	Filter,
	RefreshCw,
	MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { getAdreslerQueryOptions } from "@/hooks/use-adres-hooks";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedAdres?: Adres;
}

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/adres/",
)({
	loader: async ({ context: { queryClient }, params: { firmaId } }) => {
		await queryClient.prefetchQuery(getAdreslerQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: adreslar = [] } = useSuspenseQuery(getAdreslerQueryOptions());

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedItems(adreslar.map((item: Adres) => item.id));
		} else {
			setSelectedItems([]);
		}
	};

	const handleSelectItem = (id: string, checked: boolean) => {
		if (checked) {
			setSelectedItems((prev) => [...prev, id]);
		} else {
			setSelectedItems((prev) => prev.filter((item) => item !== id));
		}
	};

	const openDialog = (type: keyof DialogState, adres?: Adres) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedAdres: adres,
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

	const handleDropdownOpenChange = (adresId: string, open: boolean) => {
		setOpenDropdowns((prev) => {
			const newSet = new Set(prev);
			if (open) {
				newSet.add(adresId);
			} else {
				newSet.delete(adresId);
			}
			return newSet;
		});
	};

	const handleBulkDelete = () => {
		setDialogState({
			create: false,
			update: false,
			delete: true,
			selectedAdres: undefined,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Adres Yönetimi</h1>
				<p className="text-gray-600 mt-2">Araç adreslarını yönetin</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Adres Listesi</CardTitle>
						<div className="flex items-center space-x-2">
							<Button onClick={() => openDialog("create")}>
								Yeni Adres Ekle
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										<Download className="h-4 w-4 mr-2" />
										Dışa Aktar
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{/* Export options can be added here */}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{/* Filters and Search */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<Input
									placeholder="Adres ara..."
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
						</div>

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
									{/* <TableHead className="w-12">
                    <Checkbox
                      checked={false}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead> */}
									<TableHead>Firma Id</TableHead>
									<TableHead>Açıklama</TableHead>
									<TableHead>Tip</TableHead>
									<TableHead>Oluşturulma Tarihi</TableHead>
									<TableHead>Güncellenme Tarihi</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{adreslar.map((adres: Adres) => (
									<TableRow key={adres.id}>
										{/* <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(adres.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(adres.id, checked as boolean)
                        }
                      />
                    </TableCell> */}
										<TableCell className="font-medium">
											{adres.firmaId}
										</TableCell>
										<TableCell className="font-medium">
											{adres.aciklama}
										</TableCell>
										<TableCell className="font-medium">{adres.tip}</TableCell>
										<TableCell>{formatDate(adres.createdAt)}</TableCell>
										<TableCell>{formatDate(adres.updatedAt)}</TableCell>
										<TableCell>
											<DropdownMenu
												open={openDropdowns.has(adres.id)}
												onOpenChange={(open) =>
													handleDropdownOpenChange(adres.id, open)
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
														onClick={() => openDialog("update", adres)}
													>
														Düzenle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => openDialog("delete", adres)}
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
				<AdresDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					initialValues={{ firmaId }}
				/>
			)}

			{dialogState.update && dialogState.selectedAdres && (
				<AdresDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedAdres}
				/>
			)}

			{dialogState.delete && (
				<AdresSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedAdres={dialogState.selectedAdres!}
				/>
			)}
		</div>
	);
}
