import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppForm } from "@/hooks/demo.form";
import {
    useCreateAracFiloMutation,
    useUpdateAracFiloMutation,
} from "@/hooks/use-arac-filo-hooks";
import { getModellerByMarkaIdQueryOptions } from "@/hooks/use-model-hooks";
import {
    aracFiloCreateSchema,
    aracFiloUpdateSchema,
    type CreateAracFiloRequest,
    type AracFilo,
} from "@/schemas/arac-filo";
import type { Firma } from "@/schemas/firma";
import { type Marka } from "@/schemas/marka";
import type { Model } from "@/schemas/model";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
    Building,
    Car,
    FileText,
    Fuel,
    RefreshCw,
    Shield,
    Wrench,
} from "lucide-react";
import { useMemo } from "react";

interface AracFiloFormCreateProps {
	mode: "create";
	markalar: Marka[];
	firmalar: Firma[];
}

interface AracFiloFormUpdateProps {
	mode: "update";
	initialValues: AracFilo;
	markalar: Marka[];
	firmalar: Firma[];
}

type AracFiloFormProps = AracFiloFormCreateProps | AracFiloFormUpdateProps;

export default function AracFiloForm(props: AracFiloFormProps) {
	const { mode, markalar, firmalar } = props;

	const createAracFiloMutation = useCreateAracFiloMutation();
	const updateAracFiloMutation =
		mode === "create" ? null : useUpdateAracFiloMutation();

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						plaka: "",
						markaId: "",
						modelId: "",
						modelYili: "",
						aracTipi: "",
						segment: "",
						motorNo: "",
						sasiNo: "",
						renk: "",
						kasaTipi: "",
						lastikTipi: "",
						filoyaGirisTarihi: new Date(),
						filoyaGirisKm: "",
						tescilTarihi: new Date(),
						trafigeCikisTarihi: new Date(),
						garantisiVarMi: false,
						garantiBitisTarihi: new Date(),
						garantiSuresiYil: "",
						garantiKm: "",
						tramer: false,
						tramerTutari: 0,
						sonKmTarihi: new Date(),
						sonKm: "",
						sonYakitMiktari: "",
						kiralandiMi: false,
						kiralandigiTarih: new Date(),
						kontratSuresi: "",
						kiralikBitisTarihi: new Date(),
						kiralayanFirmaId: "",
						filoDurum: 0,
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? aracFiloCreateSchema : aracFiloUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
            console.log({values})
			try {
				if (mode === "create") {
					await createAracFiloMutation.mutateAsync(
						value as CreateAracFiloRequest,
					);
				} else if (mode === "update") {
					await updateAracFiloMutation!.mutateAsync(value as AracFilo);
				}
				formApi.reset();
			} catch (error) {
				console.error("Form submission error:", error);
			}
		},
	});

	const { tramer, garantisiVarMi, kiralandiMi, markaId } = useStore(
		form.store,
		(state) => {
			return {
				tramer: state.values.tramer,
				markaId: state.values.markaId,
				garantisiVarMi: state.values.garantisiVarMi,
				kiralandiMi: state.values.kiralandiMi,
			};
		},
	);

	const markalarOptions = useMemo(
		() =>
			markalar.map((marka: Marka) => ({
				label: marka.adi,
				value: marka.id,
			})),
		[markalar],
	);

	const firmalarOptions = useMemo(
		() =>
			firmalar.map((firma: Firma) => ({
				label: firma.unvan,
				value: firma.id,
			})),
		[firmalar],
	);

	const {
		data: modeller,
		isLoading: isModellerLoading,
		isFetching: isModellerFetching,
		refetch: refetchModeller,
	} = useQuery({
		...getModellerByMarkaIdQueryOptions(markaId),
		enabled: !!markaId && markaId.trim() !== "",
		refetchOnMount: true,
		retry: (failureCount) => {
			return failureCount < 3;
		},
	});

	const modellerOptions = useMemo(() => {
		if (!modeller || !Array.isArray(modeller)) {
			return [];
		}

		return modeller.map((model: Model) => ({
			label: model.adi,
			value: model.id,
		}));
	}, [modeller]);

	const isSubmitting =
		mode === "create"
			? createAracFiloMutation.isPending
			: (updateAracFiloMutation?.isPending ?? false);

	const isModelSelectDisabled =
		!markaId || isModellerLoading || isModellerFetching;

    const values = useStore(form.store, (state) => state.values)

	return (
		<div className="max-w-6xl mx-auto p-6 space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Araç Filo Kayıt Formu</h1>
				<p className="text-muted-foreground">
					Yeni araç bilgilerini eksiksiz doldurunuz
				</p>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
                    console.log(aracFiloCreateSchema.parse(values))
                    console.log(aracFiloCreateSchema.safeParse(values))
				}}
				className="space-y-6"
			>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Car className="h-5 w-5" />
							Temel Araç Bilgileri
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField
								name="markaId"
								listeners={{
									onChange: ({ value }) => {
										form.setFieldValue("markaId", value);
										form.setFieldValue("modelId", "");
									},
								}}
							>
								{(field) => (
									<field.Select
										label="Marka"
										values={markalarOptions}
										placeholder="Marka seçiniz"
									/>
								)}
							</form.AppField>
							<form.AppField
								name="modelId"
								validators={{
									onChangeListenTo: ["markaId"],
									onChange: () => refetchModeller(),
								}}
							>
								{(field) => (
									<field.Select
										label="Model"
										values={modellerOptions}
										placeholder="Model seçiniz"
										disabled={
											isModelSelectDisabled || modellerOptions.length === 0
										}
									/>
								)}
							</form.AppField>
							<form.AppField name="plaka">
								{(field) => (
									<field.TextField label="Plaka" placeholder="Plaka" />
								)}
							</form.AppField>
							<form.AppField name="aracTipi">
								{(field) => (
									<field.TextField label="Araç Tipi" placeholder="Araç Tipi" />
								)}
							</form.AppField>
							<form.AppField name="modelYili">
								{(field) => (
									<field.TextField
										label="Model Yılı"
										placeholder="Model Yılı"
									/>
								)}
							</form.AppField>
							<form.AppField name="segment">
								{(field) => (
									<field.TextField label="Segment" placeholder="Segment" />
								)}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Wrench className="h-5 w-5" />
							Teknik Detaylar
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField name="motorNo">
								{(field) => (
									<field.TextField
										label="Motor Numarası"
										placeholder="Motor Numarası"
									/>
								)}
							</form.AppField>
							<form.AppField name="sasiNo">
								{(field) => (
									<field.TextField
										label="Şasi Numarası"
										placeholder="Şasi Numarası"
									/>
								)}
							</form.AppField>
							<form.AppField name="renk">
								{(field) => <field.TextField label="Renk" placeholder="Renk" />}
							</form.AppField>
							<form.AppField name="kasaTipi">
								{(field) => (
									<field.TextField label="Kasa Tipi" placeholder="Kasa Tipi" />
								)}
							</form.AppField>
							<form.AppField name="lastikTipi">
								{(field) => (
									<field.TextField
										label="Lastik Tipi"
										placeholder="Lastik Tipi"
									/>
								)}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Filoya Giriş Bilgileri
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField name="filoyaGirisKm">
								{(field) => (
									<field.TextField
										label="Filoya Giriş Km"
										placeholder="Filoya Giriş Km"
									/>
								)}
							</form.AppField>
							<form.AppField name="filoyaGirisTarihi">
								{(field) => <field.DatePicker label="Filoya Giriş Tarihi" />}
							</form.AppField>
							<form.AppField name="tescilTarihi">
								{(field) => <field.DatePicker label="Tescil Tarihi" />}
							</form.AppField>
							<form.AppField name="trafigeCikisTarihi">
								{(field) => <field.DatePicker label="Trafiğe Çıkış Tarihi" />}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Fuel className="h-5 w-5" />
							Güncel Durum
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField name="sonKm">
								{(field) => (
									<field.TextField
										label="Son Kilometre"
										placeholder="Son Kilometre"
									/>
								)}
							</form.AppField>
							<form.AppField name="sonKmTarihi">
								{(field) => <field.DatePicker label="Son Kilometre Tarihi" />}
							</form.AppField>
							<form.AppField name="sonYakitMiktari">
								{(field) => (
									<field.TextField
										label="Son Yakıt Miktarı"
										placeholder="Son Yakıt Miktarı"
									/>
								)}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Garanti Bilgileri
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<form.AppField
							name="garantisiVarMi"
							listeners={{
								onChange: () => {
									form.setFieldValue("garantiKm", "0");
									form.setFieldValue("garantiSuresiYil", "");
									form.setFieldValue("garantiBitisTarihi", new Date());
								},
							}}
						>
							{(field) => <field.Checkbox label="Garanti var mı?" />}
						</form.AppField>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField name="garantiSuresiYil">
								{(field) => (
									<field.TextField
										label="Garanti Süresi (Yıl)"
										placeholder="Garanti Süresi (Yıl)"
										disabled={!garantisiVarMi}
									/>
								)}
							</form.AppField>
							<form.AppField name="garantiBitisTarihi">
								{(field) => (
									<field.DatePicker
										label="Garanti Bitiş Tarihi"
										disabled={!garantisiVarMi}
									/>
								)}
							</form.AppField>
							<form.AppField name="garantiKm">
								{(field) => (
									<field.TextField
										label="Garanti Km"
										placeholder="Garanti Km"
										disabled={!garantisiVarMi}
									/>
								)}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Sigorta & Hasar Bilgileri
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<form.AppField
							name="tramer"
							listeners={{
								onChange: ({ value }) => {
									if (!value) {
										form.setFieldValue("tramerTutari", 0);
									}
								},
							}}
						>
							{(field) => <field.Checkbox label="Tramer kaydı var mı?" />}
						</form.AppField>
						<form.AppField name="tramerTutari">
							{(field) => (
								<field.TextField
									label="Tramer Tutarı"
									placeholder="0"
									disabled={!tramer}
								/>
							)}
						</form.AppField>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building className="h-5 w-5" />
							Kiralama Bilgileri
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<form.AppField
							name="kiralandiMi"
							listeners={{
								onChange: ({ value }) => {
									if (!value) {
										form.setFieldValue("kontratSuresi", "");
										form.setFieldValue("kiralayanFirmaId", "");
										form.setFieldValue("kiralandigiTarih", new Date());
										form.setFieldValue("kiralikBitisTarihi", new Date());
									}
								},
							}}
						>
							{(field) => <field.Checkbox label="Araç kiralandı mı?" />}
						</form.AppField>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<form.AppField name="kiralandigiTarih">
								{(field) => (
									<field.DatePicker
										label="Kiralandığı Tarih"
										disabled={!kiralandiMi}
									/>
								)}
							</form.AppField>
							<form.AppField name="kontratSuresi">
								{(field) => (
									<field.TextField
										label="Kontrat Süresi"
										placeholder="Kontrat Süresi"
										disabled={!kiralandiMi}
									/>
								)}
							</form.AppField>
							<form.AppField name="kiralikBitisTarihi">
								{(field) => (
									<field.DatePicker
										label="Kiralık Bitiş Tarihi"
										disabled={!kiralandiMi}
									/>
								)}
							</form.AppField>
							<form.AppField name="kiralayanFirmaId">
								{(field) => (
									<field.Select
										label="Kiralayan Firma"
										values={firmalarOptions}
										placeholder="Kiralayan Firma"
										disabled={!kiralandiMi}
									/>
								)}
							</form.AppField>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Filo Durumu</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<form.AppField name="filoDurum">
							{(field) => (
								<field.TextField
									label="Filo Durum"
									placeholder="Filo durumu seçiniz"
								/>
							)}
						</form.AppField>
					</CardContent>
				</Card>
				<div className="flex justify-end space-x-4">
					<Button variant="outline" disabled={isSubmitting}>
						İptal
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting && (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						)}
						{mode === "create"
							? "Yeni Araç Filo Ekle"
							: "Seçili Araç Filoyu Güncelle"}
					</Button>
				</div>
			</form>
		</div>
	);
}
