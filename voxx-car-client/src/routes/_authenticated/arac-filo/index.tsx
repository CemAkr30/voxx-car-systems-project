import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
	Download,
	Search,
	Filter,
	RefreshCw,
	MoreHorizontal,
} from "lucide-react";
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
import type { AracFilo } from "@/schemas/arac-filo";
import { formatDate } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAracFilolarQueryOptions } from "@/hooks/use-arac-filo-hooks";
import AracFiloSilDialog from "@/components/web/arac-filo/arac-filo-sil-dialog";

interface DialogState {
	delete: boolean;
	selectedAracFilo?: AracFilo;
}

export const Route = createFileRoute("/_authenticated/arac-filo/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.prefetchQuery(getAracFilolarQueryOptions()),
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [dialogState, setDialogState] = useState<DialogState>({
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: aracFilolar = [] } = useSuspenseQuery(
		getAracFilolarQueryOptions(),
	);

	const openDialog = (type: keyof DialogState, aracFilo?: AracFilo) => {
		setDialogState({
			delete: type === "delete",
			selectedAracFilo: aracFilo,
		});
	};

	const closeDialog = () => {
		setDialogState({
			delete: false,
		});
		// Clear selected items when closing delete dialog
		if (dialogState.delete) {
			setSelectedItems([]);
		}
		// Close all dropdowns after dialog operations
		setOpenDropdowns(new Set());
	};

	const handleDropdownOpenChange = (aracFiloId: string, open: boolean) => {
		setOpenDropdowns((prev) => {
			const newSet = new Set(prev);
			if (open) {
				newSet.add(aracFiloId);
			} else {
				newSet.delete(aracFiloId);
			}
			return newSet;
		});
	};

	const handleBulkDelete = () => {
		setDialogState({
			delete: true,
			selectedAracFilo: undefined,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">AracFilo Yönetimi</h1>
				<p className="text-gray-600 mt-2">Araç aracFilolarını yönetin</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>AracFilo Listesi</CardTitle>
						<div className="flex items-center space-x-2">
							<Link to="/arac-filo/olustur" className={buttonVariants()}>
								Yeni Arac Filo Ekle
							</Link>
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
									placeholder="AracFilo ara..."
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
									<TableHead>AracFilo Id</TableHead>
									<TableHead>AracFilo Adı</TableHead>
									<TableHead>Oluşturulma Tarihi</TableHead>
									<TableHead>Güncellenme Tarihi</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{aracFilolar.map((aracFilo: AracFilo) => (
									<TableRow key={aracFilo.id}>
										<TableCell>{aracFilo.id}</TableCell>
										<TableCell className="font-medium">
											{/* <Link
												to="/aracFilo/$aracFiloId/detay"
												params={{ aracFiloId: aracFilo.id }}
											>
												{aracFilo.unvan}
											</Link> */}
											{aracFilo.plaka}
										</TableCell>
										<TableCell>{formatDate(aracFilo.createdAt)}</TableCell>
										<TableCell>{formatDate(aracFilo.updatedAt)}</TableCell>
										<TableCell>
											<DropdownMenu
												open={openDropdowns.has(aracFilo.id)}
												onOpenChange={(open) =>
													handleDropdownOpenChange(aracFilo.id, open)
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
														onClick={() =>
															router.navigate({
																to: "/arac-filo/$aracFiloId/guncelle",
																params: { aracFiloId: aracFilo.id },
															})
														}
													>
														Düzenle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => openDialog("delete", aracFilo)}
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

			{dialogState.delete && (
				<AracFiloSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedAracFilo={dialogState.selectedAracFilo!}
				/>
			)}
		</div>
	);
}
