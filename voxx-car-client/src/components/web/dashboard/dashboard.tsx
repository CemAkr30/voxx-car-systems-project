import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	TrendingUp,
	AlertCircle,
	Car,
	Building,
	Calendar,
	Shield,
	FileText,
	RefreshCw,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
	getMTVDurumQueryOptions,
	getMuayeneDurumQueryOptions,
	getSigortaDurumQueryOptions,
	getFiloDurumQueryOptions,
	getFirmaAracSayisiQueryOptions,
	getKiralananAraclarQueryOptions,
} from "@/hooks/use-dashboard-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getFirmalarQueryOptions } from "@/hooks/use-firma-hooks";

export default function Dashboard() {
	const [mtvStatus, setMtvStatus] = useState<"odenmis" | "odenmemis">("odenmemis");
	const [muayeneStatus, setMuayeneStatus] = useState<"odenmis" | "odenmemis">("odenmemis");

	const [
		{ data: mtvDurum },
		{ data: muayeneDurum },
		{ data: sigortaDurum },
		{ data: aktifFilo },
		{ data: pasifFilo },
		{ data: firmaAracSayisi },
		{ data: kiralananAraclar },
		{ data: markalar = [] },
		{ data: modeller = [] },
		{data: firmalar=[]}
	] = useSuspenseQueries({
		queries: [
			getMTVDurumQueryOptions(mtvStatus),
			getMuayeneDurumQueryOptions(muayeneStatus),
			getSigortaDurumQueryOptions(),
			getFiloDurumQueryOptions("aktif"),
			getFiloDurumQueryOptions("pasif"),
			getFirmaAracSayisiQueryOptions(),
			getKiralananAraclarQueryOptions(),
			getMarkalarQueryOptions(),
			getModellerQueryOptions(),
			getFirmalarQueryOptions()
		],
	});

	const refreshData = () => {
		// Query'ler otomatik olarak yenilenecek
		window.location.reload();
	};

	return (
		<div className="min-h-screen p-6 space-y-6">
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
									<h1 className="text-3xl font-bold">Dashboard</h1>
									<p className="text-white/80">Sistem geneli özet bilgiler</p>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Button
								onClick={refreshData}
								variant="outline"
								className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
							>
								<RefreshCw className="w-4 h-4 mr-2" />
								Yenile
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Overview Cards */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
				<Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
									Aktif Araçlar
								</p>
								<p className="text-lg font-bold text-blue-900 dark:text-blue-100">
									{aktifFilo?.length || 0}
								</p>
							</div>
							<div className="p-2 bg-blue-500 rounded-lg">
								<Car className="h-4 w-4 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20 border-gray-200 dark:border-gray-800">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
									Pasif Araçlar
								</p>
								<p className="text-lg font-bold text-gray-900 dark:text-gray-100">
									{pasifFilo?.length || 0}
								</p>
							</div>
							<div className="p-2 bg-gray-500 rounded-lg">
								<Car className="h-4 w-4 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
									Kiralanan Araçlar
								</p>
								<p className="text-lg font-bold text-green-900 dark:text-green-100">
									{kiralananAraclar?.length || 0}
								</p>
							</div>
							<div className="p-2 bg-green-500 rounded-lg">
								<Building className="h-4 w-4 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">
									Muayene Uyarısı
								</p>
								<p className="text-lg font-bold text-orange-900 dark:text-orange-100">
									{muayeneDurum?.muayeneler?.length || 0}
								</p>
							</div>
							<div className="p-2 bg-orange-500 rounded-lg">
								<Calendar className="h-4 w-4 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">
									Sigorta Uyarısı
								</p>
								<p className="text-lg font-bold text-red-900 dark:text-red-100">
									{sigortaDurum?.sigortalar?.length || 0}
								</p>
							</div>
							<div className="p-2 bg-red-500 rounded-lg">
								<Shield className="h-4 w-4 text-white" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* MTV Durum */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<FileText className="w-5 h-5" />
						MTV Durumu
					</CardTitle>
					<CardDescription>
						MTV ödeme durumunu filtreleyerek görüntüleyin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4 mb-4 items-center justify-between">
						<Select
							value={mtvStatus}
							onValueChange={(value: "odenmis" | "odenmemis") => setMtvStatus(value)}
						>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Durum" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="odenmis">Ödenen</SelectItem>
								<SelectItem value="odenmemis">Ödenmemiş</SelectItem>
							</SelectContent>
						</Select>
						
						{mtvDurum && (
							<div className="flex gap-6 text-sm">
								<div className="text-center">
									<div className="font-semibold text-blue-600">{mtvDurum.toplamKayit}</div>
									<div className="text-gray-500">Toplam Kayıt</div>
								</div>
								<div className="text-center">
									<div className="font-semibold text-green-600">{formatCurrency(mtvDurum.toplamTutar)}</div>
									<div className="text-gray-500">Toplam Tutar</div>
								</div>
							</div>
						)}
					</div>

					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Makbuz No</TableHead>
									<TableHead>Araç Plaka</TableHead>
									<TableHead>Firma</TableHead>
									<TableHead>Miktar</TableHead>
									<TableHead>Gecikme Cezası</TableHead>
									<TableHead>Durum</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mtvDurum?.mtvler?.map((mtv, index) => (
									<TableRow key={`${mtv.plaka}-${mtv.yil}-${mtv.taksit}-${index}`}>
										<TableCell className="font-medium">{mtv.makbuzNo}</TableCell>
										<TableCell className="font-medium">{mtv.plaka}</TableCell>
										<TableCell>{mtv.odeyenFirmaUnvani}</TableCell>
										<TableCell>{formatCurrency(mtv.miktar)}</TableCell>
										<TableCell>
											{Number.parseFloat(mtv.gecikmeCezasi) > 0 ? (
												<span className="text-red-600 font-medium">
													{formatCurrency(Number.parseFloat(mtv.gecikmeCezasi))}
												</span>
											) : (
												<span className="text-green-600">Yok</span>
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
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Muayene Uyarıları */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<AlertCircle className="w-5 h-5 text-orange-500" />
						Muayene Uyarıları (15 gün içinde bitiyor)
					</CardTitle>
					<CardDescription>
						Muayene süresi 15 gün içinde biten araçlar
						{muayeneDurum && (
							<span className="ml-2 text-sm text-gray-500">
								• {muayeneDurum.toplamKayit} kayıt • {formatCurrency(muayeneDurum.toplamTutar)} toplam
							</span>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4 mb-4 items-center justify-between">
						<Select
							value={muayeneStatus}
							onValueChange={(value: "odenmis" | "odenmemis") => setMuayeneStatus(value)}
						>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Durum" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="odenmis">Ödenen</SelectItem>
								<SelectItem value="odenmemis">Ödenmemiş</SelectItem>
							</SelectContent>
						</Select>
						
						{muayeneDurum && (
							<div className="flex gap-6 text-sm">
								<div className="text-center">
									<div className="font-semibold text-blue-600">{muayeneDurum.toplamKayit}</div>
									<div className="text-gray-500">Toplam Kayıt</div>
								</div>
								<div className="text-center">
									<div className="font-semibold text-green-600">{formatCurrency(muayeneDurum.toplamTutar)}</div>
									<div className="text-gray-500">Toplam Tutar</div>
								</div>
							</div>
						)}
					</div>

					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Araç Plaka</TableHead>
									<TableHead>Muayene Tipi</TableHead>
									<TableHead>Makbuz No</TableHead>
									<TableHead>Yer</TableHead>
									<TableHead>Bitiş Tarihi</TableHead>
									<TableHead>Kalan Gün</TableHead>
									<TableHead>Durum</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{muayeneDurum?.muayeneler?.map((muayene, index) => (
									<TableRow key={`${muayene.plaka}-${muayene.makbuzNo}-${index}`}>
										<TableCell className="font-medium">{muayene.plaka}</TableCell>
										<TableCell>
											<Badge variant="outline">{muayene.muayeneTipi}</Badge>
										</TableCell>
										<TableCell>{muayene.makbuzNo}</TableCell>
										<TableCell>{muayene.yeri}</TableCell>
										<TableCell>{formatDate(muayene.bitisTarihi)}</TableCell>
										<TableCell>
											<Badge
												className={
													muayene.kalanGun <= 7
														? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
														: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
												}
											>
												{muayene.kalanGun} gün
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												className={
													muayene.odendi
														? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
														: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
												}
											>
												{muayene.odendi ? "Ödendi" : "Ödenmedi"}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Sigorta Uyarıları */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<AlertCircle className="w-5 h-5 text-red-500" />
						Sigorta Uyarıları (15 gün içinde bitiyor)
					</CardTitle>
					<CardDescription>
						Sigorta süresi 15 gün içinde biten araçlar
						{sigortaDurum && (
							<span className="ml-2 text-sm text-gray-500">
								• {sigortaDurum.toplamKayit} kayıt
							</span>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Araç Plaka</TableHead>
									<TableHead>Sigorta Tipi</TableHead>
									<TableHead>Sigorta Şirketi</TableHead>
									<TableHead>Poliçe No</TableHead>
									<TableHead>Bitiş Tarihi</TableHead>
									<TableHead>Kalan Gün</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sigortaDurum?.sigortalar?.map((sigorta, index) => (
									<TableRow key={`${sigorta.plaka}-${sigorta.policeNo}-${index}`}>
										<TableCell className="font-medium">{sigorta.plaka}</TableCell>
										<TableCell>
											<Badge 
												variant="outline"
												className={
													sigorta.tip === 'KASKO' 
														? "border-blue-500 text-blue-600" 
														: "border-green-500 text-green-600"
												}
											>
												{sigorta.tip}
											</Badge>
										</TableCell>
										<TableCell>{sigorta.sigortaSirketi}</TableCell>
										<TableCell>{sigorta.policeNo}</TableCell>
										<TableCell>{formatDate(sigorta.bitisTarihi)}</TableCell>
										<TableCell>
											<Badge
												className={
													sigorta.kalanGun <= 7
														? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
														: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
												}
											>
												{sigorta.kalanGun} gün
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Firma Araç Sayıları */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Building className="w-5 h-5" />
						Firma Araç Sayıları
					</CardTitle>
					<CardDescription>
						Her firmanın kiraladığı araç sayısı
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{firmaAracSayisi?.map((firmaInfo, index) => (
							<div
								key={index}
								className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
							>
								<p className="font-medium text-blue-900 dark:text-blue-100">
									{firmaInfo}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Kiralanan Araçlar */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Car className="w-5 h-5" />
						Kiralanan Araçlar (Sözleşme Bitiş Tarihine Göre)
					</CardTitle>
					<CardDescription>
						Sözleşme bitiş tarihine göre sıralanmış kiralanan araçlar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Araç Plaka</TableHead>
									<TableHead>Firma</TableHead>
									<TableHead>Sözleşme Başlangıç</TableHead>
									<TableHead>Sözleşme Bitiş</TableHead>
									<TableHead>Ödeme Vadesi</TableHead>
									<TableHead>Durum</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{kiralananAraclar?.map((arac) => {
									const aracBilgisi = aktifFilo?.find(a => a.id === arac.aracFiloId);
									const firmaBilgisi = firmalar?.find(f => f.id === arac.firmaId);
									const sozlesmeBitisTarihi = new Date(arac.sozlesmeBitisTarihi);
									const bugun = new Date();
									const kalanGun = Math.ceil((sozlesmeBitisTarihi.getTime() - bugun.getTime()) / (1000 * 60 * 60 * 24));
									
									return (
										<TableRow key={arac.id}>
											<TableCell className="font-medium">
												{aracBilgisi?.plaka || "Bilinmiyor"}
											</TableCell>
											<TableCell>{firmaBilgisi?.unvan || "Bilinmiyor"}</TableCell>
											<TableCell>{formatDate(arac.sozlesmeBaslangicTarihi)}</TableCell>
											<TableCell>{formatDate(arac.sozlesmeBitisTarihi)}</TableCell>
											<TableCell>{arac.odemeVadesi ? `${arac.odemeVadesi} gün` : "Belirtilmemiş"}</TableCell>
											<TableCell>
												<Badge
													className={
														kalanGun <= 30
															? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
															: kalanGun <= 90
															? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
															: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
													}
												>
													{kalanGun > 0 ? `${kalanGun} gün kaldı` : "Süresi doldu"}
												</Badge>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			

			{/* Aktif ve Pasif Filo Detayları */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Car className="w-5 h-5 text-blue-500" />
							Aktif Araçlar
						</CardTitle>
						<CardDescription>
							Sistemde aktif olan araçlar
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Plaka</TableHead>
									<TableHead>Marka</TableHead>
									<TableHead>Model</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{aktifFilo?.map((arac) => (
									<TableRow key={arac.id}>
										<TableCell>{arac.plaka}</TableCell>
										<TableCell>
											{markalar.find((m) => m.id === arac.markaId)?.adi || arac.markaId}
										</TableCell>
										<TableCell>
											{modeller.find((m) => m.id === arac.modelId)?.adi || arac.modelId}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Car className="w-5 h-5 text-gray-500" />
							Pasif Araçlar
						</CardTitle>
						<CardDescription>
							Sistemde pasif olan araçlar
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Plaka</TableHead>
									<TableHead>Marka</TableHead>
									<TableHead>Model</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{pasifFilo?.map((arac) => (
									<TableRow key={arac.id}>
										<TableCell>{arac.plaka}</TableCell>
										<TableCell>
											{markalar.find((m) => m.id === arac.markaId)?.adi || arac.markaId}
										</TableCell>
										<TableCell>
											{modeller.find((m) => m.id === arac.modelId)?.adi || arac.modelId}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
