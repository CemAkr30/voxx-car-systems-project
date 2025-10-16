import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFirmaQueryOptions, getFirmaDokumanlarQueryOptions, useFirmaDokumanEkleMutation } from "@/hooks/use-firma-hooks";
import type { FirmaDokuman } from "@/schemas/firma";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	Clock,
	Download,
	Eye,
	FileText,
	Upload,
	X,
} from "lucide-react";
import { useState, useRef } from "react";

export const Route = createFileRoute(
	"/_authenticated/firma/$firmaId/_layout/detay/",
)({
	loader: ({ context: { queryClient }, params: { firmaId } }) => {
		queryClient.ensureQueryData(getFirmaQueryOptions(firmaId));
		queryClient.ensureQueryData(getFirmaDokumanlarQueryOptions(firmaId));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { firmaId } = Route.useParams();
	const queryClient = useQueryClient();
	const { data: dokumanlar } = useSuspenseQuery(getFirmaDokumanlarQueryOptions(firmaId));
	
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dokumanEkleMutation = useFirmaDokumanEkleMutation();

	// Dosya seçme fonksiyonu
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (files.length > 0) {
			// Dosya boyutu kontrolü (5MB)
			const validFiles = files.filter(file => {
				if (file.size > 5 * 1024 * 1024) {
					alert(`${file.name} dosyası 5MB'dan büyük. Lütfen daha küçük bir dosya seçin.`);
					return false;
				}
				return true;
			});
			setSelectedFiles(prev => [...prev, ...validFiles]);
		}
	};

	// Dosya kaldırma fonksiyonu
	const handleRemoveFile = (index: number) => {
		setSelectedFiles(prev => prev.filter((_, i) => i !== index));
	};

	// Dosya yükleme fonksiyonu
	const handleUploadFiles = async () => {
		if (selectedFiles.length === 0) return;

		try {
			// Dosyaları sırayla yükle
			for (const file of selectedFiles) {
				const base64 = await new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						const result = e.target?.result as string;
						// Base64'ten sadece data kısmını al (data:application/pdf;base64, kısmını çıkar)
						const base64Data = result.split(',')[1];
						resolve(base64Data);
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});

				await dokumanEkleMutation.mutateAsync({
					firmaId: firmaId,
					sozlesme: base64
				});

				await queryClient.invalidateQueries(getFirmaDokumanlarQueryOptions(firmaId));
			}
			
			// Dosyaları yükledikten sonra listeyi temizle
			setSelectedFiles([]);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (error) {
			console.error("Dosya yükleme hatası:", error);
		}
	};

	// Dosya görüntüleme fonksiyonu
	const handleViewFile = (dokuman: FirmaDokuman) => {
		try {
			// Base64'ü blob'a çevir
			const byteCharacters = atob(dokuman.sozlesme);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray], { type: 'application/pdf' });
			const url = window.URL.createObjectURL(blob);
			
			// Yeni sekmede aç
			window.open(url, '_blank');
			
			// URL'i temizle
			setTimeout(() => {
				window.URL.revokeObjectURL(url);
			}, 1000);
		} catch (error) {
			console.error("Dosya görüntüleme hatası:", error);
		}
	};

	// Dosya indirme fonksiyonu
	const handleDownloadFile = (dokuman: FirmaDokuman) => {
		try {
			// Base64'ü blob'a çevir ve indir
			const byteCharacters = atob(dokuman.sozlesme);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray]);
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `dosya-${dokuman.id.slice(-8)}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Dosya indirme hatası:", error);
		}
	};
	return (
		<div className="space-y-8">
			{/* Dosya Yönetimi - Full Width */}
			<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
				<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-t-2xl">
					<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
						<FileText className="h-5 w-5" />
						Dosya Yönetimi
					</h2>
				</div>
				<div className="p-6 space-y-6">
					{/* Dosya Yükleme Alanı */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Yeni Dosya Yükle
							</Label>
							<Button
								onClick={handleUploadFiles}
								disabled={selectedFiles.length === 0 || dokumanEkleMutation.isPending}
								size="sm"
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
							>
								<Upload className="h-4 w-4 mr-2" />
								{dokumanEkleMutation.isPending ? "Yükleniyor..." : "Yükle"}
							</Button>
						</div>
						
						<div className="relative">
							<Input
								type="file"
								ref={fileInputRef}
								onChange={handleFileSelect}
								accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
								multiple
								className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 bg-slate-50 dark:bg-slate-800/50 cursor-pointer opacity-0 absolute inset-0 z-10"
							/>
							<div className="h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
								<div className="text-center">
									<FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Dosyaları sürükleyin veya tıklayın
									</p>
								</div>
							</div>
						</div>
						
						<div className="flex items-center justify-between text-xs text-slate-500">
							<span>Desteklenen formatlar: PDF, DOC, DOCX, JPG, JPEG, PNG</span>
							<span>Maksimum: 5MB</span>
						</div>
					</div>

					{/* Seçilen Dosyalar Listesi */}
					{selectedFiles.length > 0 && (
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
									Seçilen Dosyalar
								</Label>
								<span className="text-xs text-slate-500 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
									{selectedFiles.length} dosya seçildi
								</span>
							</div>
							<div className="space-y-2 max-h-40 overflow-y-auto">
								{selectedFiles.map((file, index) => (
									<div key={index} className="group flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors duration-200">
										<div className="flex items-center space-x-3 flex-1 min-w-0">
											<div className="flex-shrink-0">
												<div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
													<FileText className="h-4 w-4 text-white" />
												</div>
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
													{file.name}
												</p>
												<p className="text-xs text-slate-500 dark:text-slate-400">
													{(file.size / 1024 / 1024).toFixed(2)} MB
												</p>
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
											onClick={() => handleRemoveFile(index)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Mevcut Dosyalar Listesi - Full Width */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label className="text-sm font-medium text-slate-600 dark:text-slate-400">
								Mevcut Dosyalar
							</Label>
							<span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
								{(dokumanlar as FirmaDokuman[]).length} dosya
							</span>
						</div>
						
						<div className="max-h-96 overflow-y-auto">
							{(dokumanlar as FirmaDokuman[]).length === 0 ? (
								<div className="text-center py-12">
									<FileText className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
									<p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
										Henüz dosya yüklenmemiş
									</p>
									<p className="text-xs text-slate-400 dark:text-slate-500">
										Yukarıdan dosya seçerek başlayabilirsiniz
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
									{(dokumanlar as FirmaDokuman[]).map((dokuman: FirmaDokuman) => (
										<div key={dokuman.id} className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer">
											<div className="flex flex-col items-center text-center space-y-3">
												{/* Dosya İkonu */}
												<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
													<FileText className="h-8 w-8 text-white" />
												</div>
												
												{/* Dosya Bilgileri */}
												<div className="w-full">
													<div className="flex items-center justify-center space-x-2 mb-2">
														<h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
															Dosya {dokuman.id.slice(-6)}
														</h4>
														<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
															PDF
														</span>
													</div>
													
													{/* Tarih Bilgisi */}
													<div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
														<div className="flex items-center justify-center">
															<Calendar className="h-3 w-3 mr-1" />
															{new Date(dokuman.createdAt).toLocaleDateString('tr-TR', {
																day: '2-digit',
																month: '2-digit',
																year: 'numeric'
															})}
														</div>
														<div className="flex items-center justify-center">
															<Clock className="h-3 w-3 mr-1" />
															{new Date(dokuman.createdAt).toLocaleTimeString('tr-TR', {
																hour: '2-digit',
																minute: '2-digit'
															})}
														</div>
													</div>
												</div>
												
												{/* Action Butonları */}
												<div className="flex space-x-2 w-full">
													<Button
														variant="ghost"
														size="sm"
														className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 flex-1"
														onClick={() => handleViewFile(dokuman)}
													>
														<Eye className="h-4 w-4 mr-1" />
														Görüntüle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex-1"
														onClick={() => handleDownloadFile(dokuman)}
													>
														<Download className="h-4 w-4 mr-1" />
														İndir
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
