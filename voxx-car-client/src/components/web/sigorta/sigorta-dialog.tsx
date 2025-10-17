import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SigortaTipiListesi, SigortaTipiListesiLabel } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getSigortalarByAracFiloIdQueryOptions,
	useCreateSigortaMutation,
	useUpdateSigortaMutation,
} from "@/hooks/use-sigorta-hooks";
import {
	sigortaCreateSchema,
	sigortaUpdateSchema,
	type CreateSigortaRequest,
	type Sigorta,
} from "@/schemas/sigorta";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw, FileText, Eye } from "lucide-react";
import { useState } from "react";

interface SigortaDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	initialValues: { aracFiloId: string };
}

interface SigortaDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Sigorta;
}

type SigortaDialogProps = SigortaDialogCreateProps | SigortaDialogUpdateProps;

export default function SigortaDialog(props: SigortaDialogProps) {
	const { mode, open, close, initialValues } = props;

	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");
	
	// Edit modunda mevcut sözleşme varsa göster
	const hasExistingSozlesme = mode === "update" && props.initialValues.sozlesme;

	// Mevcut sözleşme dosyasını indir
	const showExistingSozlesme = () => {
		if (hasExistingSozlesme && props.initialValues.sozlesme) {
			// Base64 string'i binary'ye çevir
			const binaryString = atob(props.initialValues.sozlesme);
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
			link.download = `sozlesme.${fileExtension}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	};

	const sigortaTipiOptions = SigortaTipiListesi.map((tip) => ({
		label: SigortaTipiListesiLabel[tip],
		value: tip,
	}));

	const createSigortaMutation = useCreateSigortaMutation(close);
	const updateSigortaMutation =
		mode === "create" ? null : useUpdateSigortaMutation(close);

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

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						...initialValues,
						acente: "",
						policeNo: "",
						sigortaSirketi: "",
						baslangicTarihi: new Date(),
						bitisTarihi: new Date(),
						tip: SigortaTipiListesi[0],
						sozlesme: "",
					}
				: {
						...props.initialValues,
						baslangicTarihi: new Date(props.initialValues.baslangicTarihi),
						bitisTarihi: new Date(props.initialValues.bitisTarihi),
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? sigortaCreateSchema : sigortaUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				let submitValue = { ...value };
				
				// Eğer dosya seçilmişse base64'e çevir
				if (selectedFile) {
					const base64String = await convertFileToBase64(selectedFile);
					submitValue = { ...submitValue, sozlesme: base64String };
				}

				if (mode === "create") {
					await createSigortaMutation.mutateAsync(
						submitValue as CreateSigortaRequest,
					);
				} else if (mode === "update") {
					await updateSigortaMutation!.mutateAsync(submitValue as Sigorta);
				}
				await queryClient.invalidateQueries(
					getSigortalarByAracFiloIdQueryOptions(initialValues.aracFiloId),
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
			<DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "create"
							? "Yeni Sigorta Ekle"
							: "Seçili Sigortayı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni sigorta eklemek için formu eksiksiz doldurunuz"
							: "Seçili Sigortayı Güncelle"}
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
					<form.AppField name="sigortaSirketi">
						{(field) => <field.TextField label="Sigorta Şirketi" />}
					</form.AppField>

					<form.AppField name="acente">
						{(field) => <field.TextField label="Acente" />}
					</form.AppField>

					<form.AppField name="policeNo">
						{(field) => <field.TextField label="Poliçe no" />}
					</form.AppField>

					<form.AppField name="tip">
						{(field) => (
							<field.Select label="Sigorta Tipi" values={sigortaTipiOptions} />
						)}
					</form.AppField>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<form.AppField name="baslangicTarihi">
							{(field) => <field.DatePicker label="Başlangıç Tarihi" />}
						</form.AppField>

						<form.AppField name="bitisTarihi">
							{(field) => <field.DatePicker label="Bitiş Tarihi" />}
						</form.AppField>
					</div>

					{/* Sözleşme Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="sozlesme">Sözleşme Dosyası</Label>
						
						{/* Mevcut sözleşme varsa göster */}
						{hasExistingSozlesme && !selectedFile && (
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
								<div className="flex items-center space-x-2">
									<FileText className="h-4 w-4 text-blue-600" />
									<span className="text-sm font-medium">Mevcut sözleşme dosyası mevcut</span>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={showExistingSozlesme}
									>
										<Eye className="h-4 w-4 mr-1" />
										İndir
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => {
											// Mevcut sözleşmeyi kaldır
											form.setFieldValue('sozlesme', '');
										}}
									>
										Kaldır
									</Button>
								</div>
							</div>
						)}
						
						<div className="flex items-center space-x-2">
							<Input
								id="sozlesme"
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
									const fileInput = document.getElementById('sozlesme') as HTMLInputElement;
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

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createSigortaMutation.isPending
									: updateSigortaMutation!.isPending
							}
						>
							{mode === "create" ? (
								createSigortaMutation.isPending
							) : updateSigortaMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Sigorta Ekle"
								: "Seçili Sigortayı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
