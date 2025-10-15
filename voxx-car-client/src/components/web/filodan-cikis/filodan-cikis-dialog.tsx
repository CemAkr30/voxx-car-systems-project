import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	FilodanCikisNedeniListesi,
	FilodanCikisNedeniListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getFilodanCikislarByAracFiloIdQueryOptions,
	useCreateFilodanCikisMutation,
	useUpdateFilodanCikisMutation,
} from "@/hooks/use-filodan-cikis-hooks";
import {
	type FilodanCikis,
	filodanCikisCreateSchema,
	filodanCikisUpdateSchema,
	type CreateFilodanCikisRequest,
} from "@/schemas/filodan-cikis";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw, FileText, Eye } from "lucide-react";
import { useState } from "react";

interface FilodanCikisDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: { aracFiloId: string };
}

interface FilodanCikisDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: FilodanCikis;
}

type FilodanCikisDialogProps =
	| FilodanCikisDialogCreateProps
	| FilodanCikisDialogUpdateProps;

export default function FilodanCikisDialog(props: FilodanCikisDialogProps) {
	const { mode, open, close, aracFiloId } = props;
	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");
	
	// Edit modunda mevcut fatura varsa göster
	const hasExistingFatura = mode === "update" && props.initialValues.faturaYukle;

	const filodanCikisNedeniOptions = FilodanCikisNedeniListesi.map(
		(filodanCikisNedeni) => ({
			label: FilodanCikisNedeniListesiLabel[filodanCikisNedeni],
			value: filodanCikisNedeni,
		}),
	);

	const createFilodanCikisMutation = useCreateFilodanCikisMutation(close);
	const updateFilodanCikisMutation =
		mode === "create" ? null : useUpdateFilodanCikisMutation(close);

	// Dosyayı base64'e çeviren fonksiyon
	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const result = reader.result as string;
				// "data:application/pdf;base64," kısmını kaldırıp sadece base64 string'i al
				const base64 = result.split(',')[1];
				resolve(base64);
			};
			reader.onerror = (error) => reject(error);
		});
	};

	// Mevcut fatura dosyasını indir
	const showExistingFatura = () => {
		if (hasExistingFatura && props.initialValues.faturaYukle) {
			// Base64 string'i binary'ye çevir
			const binaryString = atob(props.initialValues.faturaYukle);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			
			// Dosya tipini belirle (ilk birkaç byte'a bakarak)
			let mimeType = 'application/octet-stream';
			let fileExtension = 'bin';
			
			if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
				// PDF
				mimeType = 'application/pdf';
				fileExtension = 'pdf';
			} else if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
				// JPEG
				mimeType = 'image/jpeg';
				fileExtension = 'jpg';
			} else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
				// PNG
				mimeType = 'image/png';
				fileExtension = 'png';
			} else if (bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0) {
				// DOC/DOCX
				mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
				fileExtension = 'docx';
			}
			
			// Blob oluştur ve indir
			const blob = new Blob([bytes], { type: mimeType });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `fatura.${fileExtension}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	};

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						filodanCikisNedeni: FilodanCikisNedeniListesi[0],
						filodanCikisTarihi: new Date(),
						alici: "",
						aciklama: "",
						faturaYukle: "",
						anahtarTeslimFiyati: 0,
						aracDevirGiderleri: 0,
					}
				: {
						...props.initialValues,
						filodanCikisTarihi: new Date(
							props.initialValues.filodanCikisTarihi,
						),
					},
		validators: {
			// @ts-expect-error
			onChange:
				mode === "create" ? filodanCikisCreateSchema : filodanCikisUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				let submitValue = { ...value };
				
				// Eğer dosya seçilmişse base64'e çevir
				if (selectedFile) {
					const base64String = await convertFileToBase64(selectedFile);
					submitValue = { ...submitValue, faturaYukle: base64String };
				}

				if (mode === "create") {
					await createFilodanCikisMutation.mutateAsync(
						submitValue as CreateFilodanCikisRequest,
					);
				} else if (mode === "update") {
					await updateFilodanCikisMutation!.mutateAsync(submitValue as FilodanCikis);
				}
				await queryClient.invalidateQueries(
					getFilodanCikislarByAracFiloIdQueryOptions(aracFiloId),
				);
				formApi.reset();
				setSelectedFile(null);
				setFileName("");
			} catch (_error) {}
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				close();
				form.reset();
				setSelectedFile(null);
				setFileName("");
			}}
		>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "create"
							? "Yeni FilodanCikis Ekle"
							: "Seçili FilodanCikisi Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni filodanCikis eklemek için formu eksiksiz doldurunuz"
							: "Seçili FilodanCikisi Güncelle"}
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.AppField name="filodanCikisNedeni">
						{(field) => (
							<field.Select
								label="Filodan çıkış nedeni"
								values={filodanCikisNedeniOptions}
							/>
						)}
					</form.AppField>

					<form.AppField name="filodanCikisTarihi">
						{(field) => <field.DatePicker label="Filodan çıkış tarihi" />}
					</form.AppField>

					<form.AppField name="alici">
						{(field) => <field.TextField label="Alıcı" />}
					</form.AppField>

					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>

					{/* Fatura Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="faturaYukle">Fatura</Label>
						
						{/* Mevcut fatura varsa göster */}
						{hasExistingFatura && !selectedFile && (
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Mevcut fatura dosyası mevcut</span>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={showExistingFatura}
									>
										<Eye className="h-4 w-4 mr-1" />
										İndir
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => {
											// Mevcut faturayı kaldır
											form.setFieldValue('faturaYukle', '');
										}}
									>
										Kaldır
									</Button>
								</div>
							</div>
						)}
						
						<div className="flex items-center space-x-2">
							<Input
								id="faturaYukle"
								type="file"
								accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setSelectedFile(file);
										setFileName(file.name);
									}
								}}
								className="flex-1"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									setSelectedFile(null);
									setFileName("");
									const fileInput = document.getElementById('faturaYukle') as HTMLInputElement;
									if (fileInput) {
										fileInput.value = '';
									}
								}}
								disabled={!selectedFile}
							>
								Temizle
							</Button>
						</div>
						{selectedFile && (
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<FileText className="h-4 w-4" />
								<span>{fileName}</span>
								<span className="text-xs">
									({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
								</span>
							</div>
						)}
						<p className="text-xs text-gray-500">
							PDF, DOC, DOCX, JPG, JPEG, PNG formatları desteklenmektedir.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="anahtarTeslimFiyati">
							{(field) => (
								<field.TextField type="number" label="Anahtar Teslim Fiyatı" />
							)}
						</form.AppField>
						<form.AppField name="aracDevirGiderleri">
							{(field) => (
								<field.TextField type="number" label="Arac Devir Giderleri" />
							)}
						</form.AppField>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createFilodanCikisMutation.isPending
									: updateFilodanCikisMutation!.isPending
							}
						>
							{mode === "create" ? (
								createFilodanCikisMutation.isPending
							) : updateFilodanCikisMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Filodan Çıkış Ekle"
								: "Seçili Filodan Çıkışı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
