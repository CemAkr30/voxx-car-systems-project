import { useState, useMemo } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Edit,
	Trash2,
	Eye,
	Search,
	Filter,
	RefreshCw,
	TrendingUp,
	AlertCircle,
} from "lucide-react";
import type { Mtv } from "@/schemas/mtv";
import { formatCurrency, getPaymentTypeColor } from "@/lib/utils";
import { OdemeTipiListesiLabel } from "@/enums";
import MtvDialog from "../mtv/mtv-dialog";
import MtvSilDialog from "../mtv/mtv-sil-dialog";
import { ExportToExcel } from "@/components/export-to-excel";

interface DashboardMTVProps {
	mtvler: Mtv[];
}

interface DialogState {
	update: boolean;
	delete: boolean;
	selectedMtv?: Mtv;
}

export default function MtvDashboard({ mtvler }: DashboardMTVProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedPaymentType, setSelectedPaymentType] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");

	const [dialogState, setDialogState] = useState<DialogState>({
		update: false,
		delete: false,
	});

	// Filtered data based on search and filters
	const filteredData = useMemo(() => {
		return mtvler.filter((mtv) => {
			const matchesSearch =
				mtv.makbuzNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mtv.aciklama.toLowerCase().includes(searchTerm.toLowerCase()) ||
				mtv.aracFiloId.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesPaymentType =
				selectedPaymentType === "all" || mtv.odemeTipi === selectedPaymentType;
			const matchesStatus =
				selectedStatus === "all" ||
				(selectedStatus === "paid" && mtv.odendi) ||
				(selectedStatus === "unpaid" && !mtv.odendi);
			const matchesYear = selectedYear === "all" || mtv.yil === selectedYear;

			return (
				matchesSearch && matchesPaymentType && matchesStatus && matchesYear
			);
		});
	}, [mtvler, searchTerm, selectedPaymentType, selectedStatus, selectedYear]);

	// Statistics calculations
	const stats = useMemo(() => {
		const total = filteredData.length;
		const paid = filteredData.filter((mtv) => mtv.odendi).length;
		const unpaid = filteredData.filter((mtv) => !mtv.odendi).length;
		const totalAmount = filteredData.reduce((sum, mtv) => sum + mtv.miktar, 0);
		const totalPenalty = filteredData.reduce(
			(sum, mtv) => sum + Number.parseFloat(mtv.gecikmeCezasi),
			0,
		);

		return { total, paid, unpaid, totalAmount, totalPenalty };
	}, [filteredData]);

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedPaymentType("all");
		setSelectedStatus("all");
		setSelectedYear("all");
	};

	const closeDialog = () => {
		setDialogState({
			update: false,
			delete: false,
		});
	};

	return (
		<div className="min-h-screen">
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
					<div className="absolute inset-0 bg-black/10" />
					<div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
					<div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

					<div className="relative z-10">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
										<TrendingUp className="w-8 h-8" />
									</div>
									<div>
										<h1 className="text-3xl font-bold">MTV Dashboard</h1>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<ExportToExcel apiData={mtvler} fileName={"fileName"} />
							</div>
						</div>
					</div>
				</div>

				{/* Statistics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
					<Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
								Toplam Kayıt
							</CardTitle>
							<div className="p-2 bg-blue-500 rounded-lg">
								<TrendingUp className="h-4 w-4 text-white" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
								{stats.total}
							</div>
							<p className="text-xs text-blue-500 dark:text-blue-400">kayıt</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
								Ödenen
							</CardTitle>
							<div className="p-2 bg-green-500 rounded-lg">
								<svg
									className="h-4 w-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-900 dark:text-green-100">
								{stats.paid}
							</div>
							<p className="text-xs text-green-500 dark:text-green-400">
								işlem
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">
								Ödenmemiş
							</CardTitle>
							<div className="p-2 bg-red-500 rounded-lg">
								<AlertCircle className="h-4 w-4 text-white" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-red-900 dark:text-red-100">
								{stats.unpaid}
							</div>
							<p className="text-xs text-red-500 dark:text-red-400">bekleyen</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
								Toplam Tutar
							</CardTitle>
							<div className="p-2 bg-purple-500 rounded-lg">
								<svg
									className="h-4 w-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
								{formatCurrency(stats.totalAmount)}
							</div>
							<p className="text-xs text-purple-500 dark:text-purple-400">
								değer
							</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-200 hover:scale-105">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">
								Gecikme Cezası
							</CardTitle>
							<div className="p-2 bg-orange-500 rounded-lg">
								<AlertCircle className="h-4 w-4 text-white" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
								{formatCurrency(stats.totalPenalty)}
							</div>
							<p className="text-xs text-orange-500 dark:text-orange-400">
								ceza
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Filters */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Filter className="w-5 h-5" />
							Filtreler ve Arama
						</CardTitle>
						<CardDescription>
							MTV kayıtlarını filtrelemek ve aramak için aşağıdaki seçenekleri
							kullanın
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								<Input
									placeholder="Makbuz no, açıklama, filo ID..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>

							<Select
								value={selectedPaymentType}
								onValueChange={setSelectedPaymentType}
							>
								<SelectTrigger>
									<SelectValue placeholder="Ödeme Tipi" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Tüm Ödeme Tipleri</SelectItem>
									{Object.entries(OdemeTipiListesiLabel).map(([key, label]) => (
										<SelectItem key={key} value={key}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger>
									<SelectValue placeholder="Ödeme Durumu" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Tüm Durumlar</SelectItem>
									<SelectItem value="paid">Ödenen</SelectItem>
									<SelectItem value="unpaid">Ödenmemiş</SelectItem>
								</SelectContent>
							</Select>

							<Select value={selectedYear} onValueChange={setSelectedYear}>
								<SelectTrigger>
									<SelectValue placeholder="Yıl" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Tüm Yıllar</SelectItem>
									<SelectItem value="2024">2024</SelectItem>
									<SelectItem value="2023">2023</SelectItem>
								</SelectContent>
							</Select>

							<div className="flex gap-2">
								<Button
									variant="outline"
									onClick={clearFilters}
									className="flex-1 bg-transparent"
								>
									<RefreshCw className="w-4 h-4 mr-2" />
									Temizle
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Data Table */}
				<Card>
					<CardHeader>
						<CardTitle>MTV Kayıtları</CardTitle>
						<CardDescription>
							{filteredData.length} kayıt gösteriliyor{" "}
							{mtvler.length !== filteredData.length &&
								`(${mtvler.length} toplam kayıt)`}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10">
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Makbuz No
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Yıl/Taksit
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Miktar
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Ödeme Tipi
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Gecikme Cezası
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
											Durum
										</TableHead>
										<TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
											İşlemler
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredData.map((mtv) => (
										<TableRow
											key={mtv.id}
											className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
										>
											<TableCell>
												<div>
													<p className="font-medium text-slate-900 dark:text-slate-100">
														{mtv.makbuzNo}
													</p>
													<p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
														{mtv.aciklama}
													</p>
												</div>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-medium text-slate-900 dark:text-slate-100">
														{mtv.yil}
													</p>
													<p className="text-sm text-slate-500 dark:text-slate-400">
														{mtv.taksit}. Taksit
													</p>
												</div>
											</TableCell>
											<TableCell>
												<div>
													<p className="font-semibold text-slate-900 dark:text-slate-100">
														{formatCurrency(mtv.miktar)}
													</p>
													{Number.parseFloat(mtv.gecikmeCezasi) > 0 && (
														<p className="text-sm text-red-600 dark:text-red-400">
															+
															{formatCurrency(
																Number.parseFloat(mtv.gecikmeCezasi),
															)}{" "}
															ceza
														</p>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge className={getPaymentTypeColor(mtv.odemeTipi)}>
													{OdemeTipiListesiLabel[mtv.odemeTipi]}
												</Badge>
											</TableCell>
											<TableCell>
												{Number.parseFloat(mtv.gecikmeCezasi) > 0 ? (
													<span className="text-red-600 dark:text-red-400 font-medium">
														{formatCurrency(
															Number.parseFloat(mtv.gecikmeCezasi),
														)}
													</span>
												) : (
													<span className="text-green-600 dark:text-green-400">
														Yok
													</span>
												)}
											</TableCell>
											<TableCell>
												<Badge
													className={
														mtv.odendi
															? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
															: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
													}
												>
													{mtv.odendi ? "Ödendi" : "Ödenmedi"}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end gap-2">
													<Button
														variant="ghost"
														size="sm"
														className="p-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors group"
													>
														<Eye className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
													>
														<Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
													>
														<Trash2 className="h-4 w-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>

			{dialogState.update && dialogState.selectedMtv && (
				<MtvDialog
					aracFiloId={dialogState.selectedMtv.aracFiloId}
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					initialValues={dialogState.selectedMtv}
					firmalar={[]}
				/>
			)}

			{dialogState.delete && (
				<MtvSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedMtv={dialogState.selectedMtv!}
				/>
			)}
		</div>
	);
}
