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
import { useAppForm } from "@/hooks/demo.form";
import {
	getKiralananAracFilolarByFirmaIdQueryOptions,
	useCreateAracKiralaMutation,
	useUpdateAracKiralaMutation,
} from "@/hooks/use-arac-kirala-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import type { AracFilo } from "@/schemas/arac-filo";
import {
	aracKiralaCreateSchema,
	type CreateAracKiralaRequest,
	type AracKirala,
} from "@/schemas/arac-kirala";
import type { Firma } from "@/schemas/firma";
import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { validateFileType, getFileTypeErrorMessage } from "@/lib/utils";

interface FirmayaAracKiralaDialogCreateProps {
	mode: "firma";
	open: boolean;
	close: () => void;
	kiralanabilenAraclar: AracFilo[];
	initialValues: { firmaId: string; aracFiloId: string };
	updateData?: AracKirala;
}

interface AracıFirmayaKiralaDialogUpdateProps {
	mode: "aracFilo";
	open: boolean;
	close: () => void;
	kiralanabilenFirmalar: Firma[];
	initialValues: { firmaId: string; aracFiloId: string };
}

type AracKiralaDialogProps =
	| FirmayaAracKiralaDialogCreateProps
	| AracıFirmayaKiralaDialogUpdateProps;

export default function AracKiralaDialog(props: AracKiralaDialogProps) {
	const { mode, open, close, initialValues } = props;
	const isUpdate = 'updateData' in props && props.updateData;
	const queryClient = useQueryClient();
	const [selectedTeslimatFile, setSelectedTeslimatFile] = useState<File | null>(null);
	const [selectedSozlesmeFile, setSelectedSozlesmeFile] = useState<File | null>(null);
	const [teslimatFileName, setTeslimatFileName] = useState<string>("");
	const [sozlesmeFileName, setSozlesmeFileName] = useState<string>("");

	const [{ data: markalar = [] }, { data: modeller }] = useSuspenseQueries({
		queries: [getMarkalarQueryOptions(), getModellerQueryOptions()],
	});

	const kiralanabilenAraclarOptions =
		mode === "firma"
			? useMemo(
					() =>
						props.kiralanabilenAraclar.map((kiralanabilenArac) => ({
							label: `${kiralanabilenArac.plaka} - (${
								markalar.find((m) => m.id === kiralanabilenArac.markaId)!.adi
							} / ${
								modeller.find((m) => m.id === kiralanabilenArac.modelId)!.adi
							})`,
							value: kiralanabilenArac.id,
						})),
					[props.kiralanabilenAraclar],
				)
			: [];

	const kiralanabilenFirmalarOptions =
		mode === "aracFilo"
			? useMemo(
					() =>
						props.kiralanabilenFirmalar.map((kiralanabilenFirma) => ({
							label: kiralanabilenFirma.unvan,
							value: kiralanabilenFirma.id,
						})),
					[props.kiralanabilenFirmalar],
				)
			: [];

	const createAracKiralaMutation = useCreateAracKiralaMutation(close);
	const updateAracKiralaMutation = useUpdateAracKiralaMutation(close);

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
		defaultValues: {
			...initialValues,
			sozlesmeBaslangicTarihi: isUpdate ? new Date(props.updateData!.sozlesmeBaslangicTarihi) : new Date(),
			sozlesmeBitisTarihi: isUpdate ? new Date(props.updateData!.sozlesmeBitisTarihi) : new Date(),
			teslimatTutanagi: isUpdate ? props.updateData!.teslimatTutanagi || "" : "",
			sozlesme: isUpdate ? props.updateData!.sozlesme || "" : "",
			odemeVadesi: isUpdate ? props.updateData!.odemeVadesi || 0 : 0,
		},
		validators: {
			// @ts-expect-error
			onChange: aracKiralaCreateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				let submitValue = { ...value };
				
				// Eğer teslimat tutanağı dosyası seçilmişse base64'e çevir
				if (selectedTeslimatFile) {
					const base64String = await convertFileToBase64(selectedTeslimatFile);
					submitValue = { ...submitValue, teslimatTutanagi: base64String };
				}

				// Eğer sözleşme dosyası seçilmişse base64'e çevir
				if (selectedSozlesmeFile) {
					const base64String = await convertFileToBase64(selectedSozlesmeFile);
					submitValue = { ...submitValue, sozlesme: base64String };
				}

				if (isUpdate) {
					await updateAracKiralaMutation.mutateAsync({
						id: props.updateData!.id,
						data: submitValue as CreateAracKiralaRequest,
					});
				} else {
					await createAracKiralaMutation.mutateAsync(
						submitValue as CreateAracKiralaRequest,
					);
				}

				queryClient.invalidateQueries(
					getKiralananAracFilolarByFirmaIdQueryOptions(initialValues.firmaId),
				);
				formApi.reset();
				setSelectedTeslimatFile(null);
				setSelectedSozlesmeFile(null);
				setTeslimatFileName("");
				setSozlesmeFileName("");
			} catch (_error) {}
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				close();
				form.reset();
				setSelectedTeslimatFile(null);
				setSelectedSozlesmeFile(null);
				setTeslimatFileName("");
				setSozlesmeFileName("");
			}}
		>
			<DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>{isUpdate ? "Araç Kiralama Güncelle" : "Yeni Araç Kirala"}</DialogTitle>
					<DialogDescription>{isUpdate ? "Araç kiralama bilgilerini güncelle" : "Yeni araç kirala"}</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					{mode === "aracFilo" && (
						<form.AppField name="firmaId">
							{(field) => (
								<field.Select
									label="Firma"
									values={kiralanabilenFirmalarOptions}
								/>
							)}
						</form.AppField>
					)}

					{mode === "firma" && (
						<form.AppField name="aracFiloId">
							{(field) => (
								<field.Select
									label="Araç"
									values={kiralanabilenAraclarOptions}
								/>
							)}
						</form.AppField>
					)}


					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<form.AppField name="sozlesmeBaslangicTarihi">
							{(field) => <field.DatePicker label="Sözleşme Başlangıç Tarihi" />}
						</form.AppField>

						<form.AppField name="sozlesmeBitisTarihi">
							{(field) => <field.DatePicker label="Sözleşme Bitiş Tarihi" />}
						</form.AppField>
					</div>


					<form.AppField name="odemeVadesi">
						{(field) => <field.TextField type="number" label="Ödeme Vadesi (Gün)" />}
					</form.AppField>

					{/* Teslimat Tutanağı Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="teslimatTutanagi">Teslimat Tutanağı</Label>
						<div className="flex items-center space-x-2">
							<Input
								id="teslimatTutanagi"
								type="file"
								accept=".pdf,.jpg,.jpeg,.png"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										if (!validateFileType(file)) {
											toast.error(getFileTypeErrorMessage());
											e.target.value = '';
											return;
										}
										setSelectedTeslimatFile(file);
										setTeslimatFileName(file.name);
									}
								}}
								className="flex-1"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									setSelectedTeslimatFile(null);
									setTeslimatFileName("");
									const fileInput = document.getElementById('teslimatTutanagi') as HTMLInputElement;
									if (fileInput) {
										fileInput.value = '';
									}
								}}
								disabled={!selectedTeslimatFile}
							>
								Temizle
							</Button>
						</div>
						{selectedTeslimatFile && (
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<FileText className="h-4 w-4" />
								<span>{teslimatFileName}</span>
								<span className="text-xs">
									({(selectedTeslimatFile.size / 1024 / 1024).toFixed(2)} MB)
								</span>
							</div>
						)}
								<p className="text-xs text-gray-500">
									Sadece PDF ve görsel (JPG, JPEG, PNG) dosyaları yüklenebilir.
								</p>
					</div>

					{/* Sözleşme Dosyası Yükleme Alanı */}
					<div className="space-y-2">
						<Label htmlFor="sozlesme">Sözleşme</Label>
						<div className="flex items-center space-x-2">
							<Input
								id="sozlesme"
								type="file"
								accept=".pdf,.jpg,.jpeg,.png"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										if (!validateFileType(file)) {
											toast.error(getFileTypeErrorMessage());
											e.target.value = '';
											return;
										}
										setSelectedSozlesmeFile(file);
										setSozlesmeFileName(file.name);
									}
								}}
								className="flex-1"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									setSelectedSozlesmeFile(null);
									setSozlesmeFileName("");
									const fileInput = document.getElementById('sozlesme') as HTMLInputElement;
									if (fileInput) {
										fileInput.value = '';
									}
								}}
								disabled={!selectedSozlesmeFile}
							>
								Temizle
							</Button>
						</div>
						{selectedSozlesmeFile && (
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<FileText className="h-4 w-4" />
								<span>{sozlesmeFileName}</span>
								<span className="text-xs">
									({(selectedSozlesmeFile.size / 1024 / 1024).toFixed(2)} MB)
								</span>
							</div>
						)}
								<p className="text-xs text-gray-500">
									Sadece PDF ve görsel (JPG, JPEG, PNG) dosyaları yüklenebilir.
								</p>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button type="submit" disabled={createAracKiralaMutation.isPending || updateAracKiralaMutation.isPending}>
							{createAracKiralaMutation.isPending || updateAracKiralaMutation.isPending ? "Kaydediliyor..." : (isUpdate ? "Güncelle" : "Aracı Kirala")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
