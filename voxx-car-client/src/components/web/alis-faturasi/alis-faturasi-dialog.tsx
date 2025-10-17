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
import { ParaBirimiTipiListesi, ParaBirimiTipiListesiLabel } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getAlisFaturalariByAracFiloIdQueryOptions,
	useCreateAlisFaturasiMutation,
	useUpdateAlisFaturasiMutation,
} from "@/hooks/use-alis-faturasi-hooks";
import {
	type AlisFaturasi,
	alisFaturasiCreateSchema,
	alisFaturasiUpdateSchema,
	type CreateAlisFaturasiRequest,
} from "@/schemas/alis-faturasi";
import { RefreshCw, FileText, Eye } from "lucide-react";
import type { Firma } from "@/schemas/firma.ts";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AlisFaturasiDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: { aracFiloId: string };
}

interface AlisFaturasiDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: AlisFaturasi;
}

type AlisFaturasiDialogProps =
	| AlisFaturasiDialogCreateProps
	| AlisFaturasiDialogUpdateProps;

export default function AlisFaturasiDialog(props: AlisFaturasiDialogProps) {
	const { mode, open, close, firmalar, aracFiloId } = props;
	const queryClient = useQueryClient();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");

	const paraBirimiTipiOptions = ParaBirimiTipiListesi.map((paraBirimi) => ({
		label: ParaBirimiTipiListesiLabel[paraBirimi],
		value: paraBirimi,
	}));

	const firmalarOptions = useMemo(
		() =>
			firmalar.map((firma: Firma) => ({
				label: firma.unvan,
				value: firma.id,
			})),
		[firmalar],
	);

	const createAlisFaturasiMutation = useCreateAlisFaturasiMutation(close);
	const updateAlisFaturasiMutation =
		mode === "create" ? null : useUpdateAlisFaturasiMutation(close);

	// Edit modunda mevcut fatura varsa göster
	const hasExistingFatura = mode === "update" && props.initialValues.faturaYukle;

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

	// Mevcut faturayı yeni sekmede göster
	const showExistingFatura = () => {
		if (hasExistingFatura) {
			const newWindow = window.open();
			if (newWindow) {
				newWindow.document.write(`
					<html>
						<head><title>Fatura</title></head>
						<body style="margin:0; padding:0;">
							<iframe src="data:application/pdf;base64,${props.initialValues.faturaYukle}" 
									width="100%" height="100%" style="border:none;">
							</iframe>
						</body>
					</html>
				`);
			}
		}
	};

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						alisFaturasiTarihi: new Date(),
						saticiFirmaId: "",
						listeFiyati: 0,
						ekGaranti: 0,
						malDegeri: 0,
						iskonto: 0,
						nakliyeBedeli: 0,
						otvMatrah: 0,
						otv: 0,
						otvIndirimi: 0,
						kdv: 0,
						faturaToplam: 0,
						paraBirimi: ParaBirimiTipiListesi[0],
						gecikmeCezasi: "",
						kur: 0,
						faturaTry: 0,
						faturaYukle: "",
						aciklama: "",
					}
				: {
						...props.initialValues,
						alisFaturasiTarihi: new Date(
							props.initialValues.alisFaturasiTarihi,
						),
					},
		validators: {
			// @ts-expect-error
			onChange:
				mode === "create" ? alisFaturasiCreateSchema : alisFaturasiUpdateSchema,
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
					await createAlisFaturasiMutation.mutateAsync(
						submitValue as CreateAlisFaturasiRequest,
					);
				} else if (mode === "update") {
					await updateAlisFaturasiMutation!.mutateAsync(submitValue as AlisFaturasi);
				}
				await queryClient.invalidateQueries(
					getAlisFaturalariByAracFiloIdQueryOptions(aracFiloId),
				);
				formApi.reset();
			} catch (_error) {}
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				close();
				form.reset();
			}}
		>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "create"
							? "Yeni Alış faturası Ekle"
							: "Seçili Alış faturasını Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni alış faturası eklemek için formu eksiksiz doldurunuz"
							: "Seçili Alış faturasını Güncelle"}
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="alisFaturasiTarihi">
							{(field) => <field.DatePicker label="Alış faturası tarihi" />}
						</form.AppField>

						<form.AppField name="saticiFirmaId">
							{(field) => (
								<field.Select label="Satıcı Firma" values={firmalarOptions} />
							)}
						</form.AppField>

						<form.AppField name="listeFiyati">
							{(field) => <field.TextField label="liste Fiyatı" />}
						</form.AppField>

						<form.AppField name="ekGaranti">
							{(field) => <field.TextField label="Ek Garanti" />}
						</form.AppField>

						<form.AppField name="malDegeri">
							{(field) => <field.TextField label="Mal değeri" />}
						</form.AppField>

						<form.AppField name="iskonto">
							{(field) => <field.TextField label="İskonto" />}
						</form.AppField>

						<form.AppField name="nakliyeBedeli">
							{(field) => <field.TextField label="Nakliye bedeli" />}
						</form.AppField>

						<form.AppField name="otvMatrah">
							{(field) => <field.TextField label="OTV matrahı" />}
						</form.AppField>

						<form.AppField name="otv">
							{(field) => <field.TextField label="OTV" />}
						</form.AppField>

						<form.AppField name="otvIndirimi">
							{(field) => <field.TextField label="OTV indirimi" />}
						</form.AppField>

						<form.AppField name="kdv">
							{(field) => <field.TextField label="KDV" />}
						</form.AppField>

						<form.AppField name="faturaToplam">
							{(field) => <field.TextField label="Fatura toplam" />}
						</form.AppField>

						<form.AppField name="paraBirimi">
							{(field) => (
								<field.Select
									label="Para birimi"
									values={paraBirimiTipiOptions}
								/>
							)}
						</form.AppField>

						<form.AppField name="gecikmeCezasi">
							{(field) => <field.TextField label="Gecikme cezası" />}
						</form.AppField>

						<form.AppField name="kur">
							{(field) => <field.TextField label="Kur" />}
						</form.AppField>

						<form.AppField name="faturaTry">
							{(field) => <field.TextField label="Fatura TRY" />}
						</form.AppField>

						<div className="col-span-2">
							<form.AppField name="aciklama">
								{(field) => <field.TextArea label="Açıklama" />}
							</form.AppField>
						</div>
					</div>

					{/* Fatura Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="faturaYukle">Fatura Dosyası</Label>
						
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
										Göster
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

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createAlisFaturasiMutation.isPending
									: updateAlisFaturasiMutation!.isPending
							}
						>
							{mode === "create" ? (
								createAlisFaturasiMutation.isPending
							) : updateAlisFaturasiMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Alış faturası Ekle"
								: "Seçili Alış faturasını Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
