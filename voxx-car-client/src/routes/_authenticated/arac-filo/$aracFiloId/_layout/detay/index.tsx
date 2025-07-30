import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-dropdown-menu";
import { createFileRoute } from "@tanstack/react-router";
import {
	Car,
	FileText,
	Calendar,
	AlertTriangle,
	Edit,
	Camera,
	Upload,
	Plus,
	Download,
	Clock,
	Trash2,
} from "lucide-react";
import React from "react";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/detay/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const vehicleData = {
		plateNumber: "06BB8123",
		brand: "BMW",
		model: "3 Serisi",
		year: 2020,
		color: "Beyaz",
		chassisNumber: "WBA8E9G50KNU12345",
		engineNumber: "N20B20A12345",
		fuelType: "Benzin",
		transmission: "Otomatik",
		mileage: 45000,
		lastInspection: "15.03.2024",
		insuranceCompany: "Axa Sigorta",
		policyNumber: "POL123456789",
		policyExpiry: "25.12.2024",
	};

	const damageAreas = [
		{
			id: 1,
			area: "Ön Kaput",
			severity: "Orta",
			description: "Çizik ve ezik",
			cost: 2500,
		},
		{
			id: 2,
			area: "Sağ Ön Kapı",
			severity: "Hafif",
			description: "Boya hasarı",
			cost: 1200,
		},
		{
			id: 3,
			area: "Sağ Arka Kapı",
			severity: "Ağır",
			description: "Derin çizik ve göçük",
			cost: 3800,
		},
		{
			id: 4,
			area: "Arka Tampon",
			severity: "Orta",
			description: "Çatlak ve ezik",
			cost: 1800,
		},
	];

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "Hafif":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "Orta":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "Ağır":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return

	return (
		<React.Fragment>
			<div className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Vehicle Info */}
					<div className="lg:col-span-1 space-y-6">
						{/* Vehicle Details */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
							<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
								<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									<Car className="h-5 w-5" />
									Araç Bilgileri
								</h2>
							</div>
							<div className="p-6 space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Plaka
										</Label>
										<p className="text-slate-900 dark:text-slate-100 font-semibold">
											{vehicleData.plateNumber}
										</p>
									</div>
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Marka/Model
										</Label>
										<p className="text-slate-900 dark:text-slate-100 font-semibold">
											{vehicleData.brand} {vehicleData.model}
										</p>
									</div>
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Yıl
										</Label>
										<p className="text-slate-900 dark:text-slate-100">
											{vehicleData.year}
										</p>
									</div>
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Renk
										</Label>
										<p className="text-slate-900 dark:text-slate-100">
											{vehicleData.color}
										</p>
									</div>
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Yakıt Tipi
										</Label>
										<p className="text-slate-900 dark:text-slate-100">
											{vehicleData.fuelType}
										</p>
									</div>
									<div>
										<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
											Vites
										</Label>
										<p className="text-slate-900 dark:text-slate-100">
											{vehicleData.transmission}
										</p>
									</div>
								</div>
								<div className="pt-4 border-t border-slate-200 dark:border-slate-700">
									<div className="space-y-3">
										<div>
											<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
												Şasi No
											</Label>
											<p className="text-slate-900 dark:text-slate-100 font-mono text-sm">
												{vehicleData.chassisNumber}
											</p>
										</div>
										<div>
											<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
												Motor No
											</Label>
											<p className="text-slate-900 dark:text-slate-100 font-mono text-sm">
												{vehicleData.engineNumber}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Insurance Info */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
							<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
								<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									<FileText className="h-5 w-5" />
									Sigorta Bilgileri
								</h2>
							</div>
							<div className="p-6 space-y-4">
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Sigorta Şirketi
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-semibold">
										{vehicleData.insuranceCompany}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Poliçe No
									</Label>
									<p className="text-slate-900 dark:text-slate-100 font-mono">
										{vehicleData.policyNumber}
									</p>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Bitiş Tarihi
									</Label>
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-slate-400" />
										<p className="text-slate-900 dark:text-slate-100">
											{vehicleData.policyExpiry}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Center Column - Car Diagram */}
					<div className="lg:col-span-1">
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
							<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
								<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									<AlertTriangle className="h-5 w-5" />
									Hasar Görünümü
								</h2>
							</div>
							<div className="p-6">
								{/* Car Diagram */}
								<div className="relative bg-slate-50 dark:bg-slate-800 rounded-xl p-8 mb-6">
									<div className="flex justify-center">
										<div className="relative">
											{/* Car SVG - Simplified top view */}
											<svg
												width="200"
												role="img"
												aria-label="asdasd"
												height="300"
												viewBox="0 0 200 300"
												className="text-slate-400"
											>
												{/* Car body */}
												<rect
													x="50"
													y="50"
													width="100"
													height="200"
													rx="20"
													fill="currentColor"
													stroke="#e2e8f0"
													strokeWidth="2"
												/>
												{/* Hood - Damaged */}
												<rect
													x="60"
													y="40"
													width="80"
													height="30"
													rx="10"
													fill="#ef4444"
													opacity="0.7"
												/>
												{/* Right doors - Damaged */}
												<rect
													x="150"
													y="80"
													width="20"
													height="60"
													rx="5"
													fill="#f97316"
													opacity="0.7"
												/>
												<rect
													x="150"
													y="160"
													width="20"
													height="60"
													rx="5"
													fill="#dc2626"
													opacity="0.7"
												/>
												{/* Rear bumper - Damaged */}
												<rect
													x="60"
													y="240"
													width="80"
													height="20"
													rx="10"
													fill="#f97316"
													opacity="0.7"
												/>
												{/* Wheels */}
												<circle cx="70" cy="80" r="8" fill="#374151" />
												<circle cx="130" cy="80" r="8" fill="#374151" />
												<circle cx="70" cy="220" r="8" fill="#374151" />
												<circle cx="130" cy="220" r="8" fill="#374151" />
											</svg>
										</div>
									</div>
									<div className="text-center mt-4">
										<p className="text-sm text-slate-600 dark:text-slate-400">
											Hasarlı bölgeler renkli olarak gösterilmektedir
										</p>
									</div>
								</div>

								{/* Damage Legend */}
								<div className="space-y-3">
									<h3 className="font-semibold text-slate-900 dark:text-slate-100">
										Hasar Seviyeleri:
									</h3>
									<div className="flex flex-wrap gap-3">
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-yellow-500 rounded" />
											<span className="text-sm text-slate-600 dark:text-slate-400">
												Hafif
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-orange-500 rounded" />
											<span className="text-sm text-slate-600 dark:text-slate-400">
												Orta
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-red-500 rounded" />
											<span className="text-sm text-slate-600 dark:text-slate-400">
												Ağır
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Damage Details */}
					<div className="lg:col-span-1 space-y-6">
						{/* Damage Notes */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
							<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
								<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									<Edit className="h-5 w-5" />
									Hasar Notu
								</h2>
							</div>
							<div className="p-6 space-y-4">
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Otoyol Geçiş Sistemi
									</Label>
									<select className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100">
										<option>Seçiniz</option>
										<option>OGS</option>
										<option>HGS</option>
										<option>Yok</option>
									</select>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Ürün No
									</Label>
									<input
										type="text"
										className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100"
										placeholder="Ürün numarasını girin..."
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
										Hasar Notu
									</Label>
									<textarea
										rows={4}
										className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100"
										placeholder="Hasar detaylarını açıklayın..."
									/>
								</div>
							</div>
						</div>

						{/* File Attachments */}
						<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
							<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
								<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
									<Camera className="h-5 w-5" />
									Dosyalar
								</h2>
							</div>
							<div className="p-6 space-y-4">
								<div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
									<Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
									<p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
										Hasar fotoğraflarını yükleyin
									</p>
									<Button size="sm">
										<Plus className="h-4 w-4" />
										Dosya Seç
									</Button>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
										<div className="flex items-center gap-3">
											<Camera className="h-4 w-4 text-slate-400" />
											<span className="text-sm text-slate-900 dark:text-slate-100">
												hasar_foto_1.jpg
											</span>
										</div>
										<Button variant="ghost" size="sm">
											<Download className="h-4 w-4" />
										</Button>
									</div>
									<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
										<div className="flex items-center gap-3">
											<Camera className="h-4 w-4 text-slate-400" />
											<span className="text-sm text-slate-900 dark:text-slate-100">
												hasar_foto_2.jpg
											</span>
										</div>
										<Button variant="ghost" size="sm">
											<Download className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Damage Details Table */}
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
					<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-t-2xl">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
								<FileText className="h-5 w-5" />
								Araç Hasar Detayları
							</h2>
							<Button size="sm">
								<Plus className="h-4 w-4" />
								Yeni Hasar Ekle
							</Button>
						</div>
					</div>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10">
									<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
										İşlem Tipi
									</TableHead>
									<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
										Kayıt No
									</TableHead>
									<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
										Çık. Trh. / Saat
									</TableHead>
									<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
										Dönüş Trh.
									</TableHead>
									<TableHead className="font-semibold text-slate-700 dark:text-slate-300">
										İşlemler
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{damageAreas.map((damage) => (
									<TableRow
										key={damage.id}
										className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10"
									>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
													<AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
												</div>
												<div>
													<p className="font-medium text-slate-900 dark:text-slate-100">
														{damage.area}
													</p>
													<span
														className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(damage.severity)}`}
													>
														{damage.severity}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<span className="font-mono text-sm text-slate-600 dark:text-slate-400">
												HSR{damage.id.toString().padStart(4, "0")}
											</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-slate-400" />
												<span className="text-slate-600 dark:text-slate-400">
													25.03.2024 / 14:30
												</span>
											</div>
										</TableCell>
										<TableCell>
											<span className="text-slate-600 dark:text-slate-400">
												28.03.2024
											</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button variant="ghost" size="sm">
													<Edit className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="sm">
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
