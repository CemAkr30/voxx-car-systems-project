import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import MarkaDialog from "@/components/web/marka/marka-dialog";
import {
	markalarGetQueryOptions,
	useMarkalarQuery,
} from "@/hooks/use-marka-hooks";
import MarkaSilDialog from "@/components/web/marka/marka-sil-dialog";
import type { Marka } from "@/schemas/marka";
import { formatDate } from "@/lib/utils";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedMarka?: Marka;
}

export const Route = createFileRoute("/_authenticated/marka/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.prefetchQuery(markalarGetQueryOptions()),
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: markalar = [] } = useMarkalarQuery();

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedItems(markalar.map((item: Marka) => item.id));
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

	const openDialog = (type: keyof DialogState, marka?: Marka) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedMarka: marka,
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

	const handleDropdownOpenChange = (markaId: string, open: boolean) => {
		setOpenDropdowns((prev) => {
			const newSet = new Set(prev);
			if (open) {
				newSet.add(markaId);
			} else {
				newSet.delete(markaId);
			}
			return newSet;
		});
	};

	const handleBulkDelete = () => {
		setDialogState({
			create: false,
			update: false,
			delete: true,
			selectedMarka: undefined,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Marka Yönetimi</h1>
				<p className="text-gray-600 mt-2">Araç markalarını yönetin</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Marka Listesi</CardTitle>
						<div className="flex items-center space-x-2">
							<Button onClick={() => openDialog("create")}>
								Yeni Marka Ekle
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
									placeholder="Marka ara..."
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
									<TableHead>Marka Id</TableHead>
									<TableHead>Marka Adı</TableHead>
									<TableHead>Oluşturulma Tarihi</TableHead>
									<TableHead>Güncellenme Tarihi</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{markalar.map((marka: Marka) => (
									<TableRow key={marka.id}>
										{/* <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(marka.id)}
                        onCheckedChange={(checked) =>
                          handleSelectItem(marka.id, checked as boolean)
                        }
                      />
                    </TableCell> */}
										<TableCell>{marka.id}</TableCell>
										<TableCell className="font-medium">{marka.adi}</TableCell>
										<TableCell>{formatDate(marka.createdAt)}</TableCell>
										<TableCell>{formatDate(marka.updatedAt)}</TableCell>
										<TableCell>
											<DropdownMenu
												open={openDropdowns.has(marka.id)}
												onOpenChange={(open) =>
													handleDropdownOpenChange(marka.id, open)
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
														onClick={() => openDialog("update", marka)}
													>
														Düzenle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => openDialog("delete", marka)}
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
				<MarkaDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
				/>
			)}

			{dialogState.update && dialogState.selectedMarka && (
				<MarkaDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedMarka}
				/>
			)}

			{dialogState.delete && (
				<MarkaSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedMarka={dialogState.selectedMarka!}
				/>
			)}
		</div>
	);
}
