import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
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
import type { AracFilo } from "@/schemas/arac-filo";
import { formatDate } from "@/lib/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getAracFilolarQueryOptions } from "@/hooks/use-arac-filo-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import AracFiloSilDialog from "@/components/web/arac-filo/arac-filo-sil-dialog";

interface DialogState {
	delete: boolean;
	selectedAracFilo?: AracFilo;
}

export const Route = createFileRoute("/_authenticated/arac-filo/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(getAracFilolarQueryOptions());
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getModellerQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [dialogState, setDialogState] = useState<DialogState>({
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
	const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

	const [{ data: aracFilolar = [] }, { data: markalar = [] }, { data: modeller = [] }] = useSuspenseQueries({
		queries: [
			getAracFilolarQueryOptions(),
			getMarkalarQueryOptions(),
			getModellerQueryOptions(),
		],
	});

	// Filtrelenmiş araç listesi
	const filteredAracFilolar = aracFilolar.filter(aracFilo => {
		if (filterStatus === 'active') return aracFilo.filoDurum === 1;
		if (filterStatus === 'inactive') return aracFilo.filoDurum === 0;
		return true; // 'all' için tüm araçlar
	});

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
					{/* Filters and Search */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-4">
							<Button 
								variant={filterStatus === 'all' ? 'default' : 'outline'} 
								size="sm"
								onClick={() => setFilterStatus('all')}
							>
								Tümü ({aracFilolar.length})
							</Button>
							<Button 
								variant={filterStatus === 'active' ? 'default' : 'outline'} 
								size="sm"
								onClick={() => setFilterStatus('active')}
							>
								Aktif ({aracFilolar.filter(a => a.filoDurum === 1).length})
							</Button>
							<Button 
								variant={filterStatus === 'inactive' ? 'default' : 'outline'} 
								size="sm"
								onClick={() => setFilterStatus('inactive')}
							>
								Pasif ({aracFilolar.filter(a => a.filoDurum === 0).length})
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
									<TableHead>Durum</TableHead>
									<TableHead>Plaka</TableHead>
									<TableHead>Marka / Model</TableHead>
									<TableHead>Model Yılı</TableHead>
									<TableHead>Filoya Giriş Tarihi</TableHead>
									<TableHead>Son KM</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredAracFilolar.map((aracFilo: AracFilo) => (
									<TableRow key={aracFilo.id}>
										<TableCell>
											<Badge 
												className={aracFilo.filoDurum === 1 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"}
											>
												{aracFilo.filoDurum === 1 ? "Aktif" : "Pasif"}
											</Badge>
										</TableCell>
										<TableCell className="font-medium">
											<Link
												to="/arac-filo/$aracFiloId/detay"
												params={{ aracFiloId: aracFilo.id }}
											>
												{aracFilo.plaka}
											</Link>
										</TableCell>
										<TableCell>
											<span className="font-medium text-slate-900 dark:text-slate-100">
												{markalar.find(m => m.id === aracFilo.markaId)?.adi}
											</span> / {" "}
											<span className="font-medium text-slate-900 dark:text-slate-100">
												{modeller.find(m => m.id === aracFilo.modelId)?.adi}
											</span>
										</TableCell>
										<TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-medium">
												{aracFilo.modelYili}
											</span>
										</TableCell>
										<TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-medium">
												{formatDate(aracFilo.filoyaGirisTarihi.toString())}
											</span>
										</TableCell>
										<TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-medium">
												{aracFilo.sonKm} km
											</span>
										</TableCell>
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
