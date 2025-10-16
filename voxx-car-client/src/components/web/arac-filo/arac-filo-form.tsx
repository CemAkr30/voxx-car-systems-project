import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	AracSegmentListesi,
	AracSegmentListesiLabel,
	AracSegmentListesiYardımMetni,
	KasaTipiListesi,
	KasaTipiListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getAracFilolarQueryOptions,
	getAracFiloQueryOptions,
	useCreateAracFiloMutation,
	useUpdateAracFiloMutation,
} from "@/hooks/use-arac-filo-hooks";
import { getModellerByMarkaIdQueryOptions } from "@/hooks/use-model-hooks";
import { cn } from "@/lib/utils";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
	Building,
	Car,
	FileText,
	Fuel,
	RefreshCw,
	Shield,
	Wrench,
} from "lucide-react";
import React, { useMemo } from "react";

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
	const queryClient = useQueryClient();

	const createAracFiloMutation = useCreateAracFiloMutation();
	const updateAracFiloMutation =
		mode === "create" ? null : useUpdateAracFiloMutation();
	const navigate = useNavigate();

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						plaka: "",
						markaId: "",
						modelId: "",
						modelYili: "",
						segment: AracSegmentListesi[0],
						motorNo: "",
						sasiNo: "",
						renk: "",
						kasaTipi: KasaTipiListesi[0],
						muayeneBitisTarihi: new Date(),
						lastikTipi: "",
						filoyaGirisTarihi: new Date(),
						filoyaGirisKm: "",
						tescilTarihi: new Date(),
						trafigeCikisTarihi: new Date(),
						garantisiVarMi: false,
						garantiBaslangicTarihi: new Date(),
						garantiSuresiYil: "",
						garantiKm: "",
						tramer: false,
						tramerTutari: 0,
						sonKmTarihi: new Date(),
						sonKm: "",
						filoDurum: 0,
					}
				: {
						...props.initialValues,
						filoyaGirisTarihi: new Date(props.initialValues.filoyaGirisTarihi),
						tescilTarihi: new Date(props.initialValues.tescilTarihi),
						trafigeCikisTarihi: new Date(
							props.initialValues.trafigeCikisTarihi,
						),
						muayeneBitisTarihi: new Date(
							props.initialValues.muayeneBitisTarihi,
						),
						sonKmTarihi: new Date(props.initialValues.sonKmTarihi),
						garantiBaslangicTarihi: new Date(
							props.initialValues.garantiBaslangicTarihi,
						),
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? aracFiloCreateSchema : aracFiloUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createAracFiloMutation.mutateAsync(
						value as CreateAracFiloRequest,
					);
				} else if (mode === "update") {
					await updateAracFiloMutation!.mutateAsync(value as AracFilo);
					await queryClient.invalidateQueries(getAracFiloQueryOptions(props.initialValues.id!));
				}
				await queryClient.invalidateQueries(getAracFilolarQueryOptions());
				navigate({ to: "/arac-filo" });
				formApi.reset();
			} catch (error) {
				console.error("Form submission error:", error);
			}
		},
	});

	const { markaId, canSubmit, segment } = useStore(form.store, (state) => ({
		markaId: state.values.markaId,
		segment: state.values.segment,
		canSubmit: state.canSubmit,
	}));

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

	const segmentOptions = AracSegmentListesi.map((segment) => ({
		label: AracSegmentListesiLabel[segment],
		value: segment,
	}));

	const kasaTipiOptions = KasaTipiListesi.map((kasaTipi) => ({
		label: KasaTipiListesiLabel[kasaTipi],
		value: kasaTipi,
	}));

	const {
		data: modeller,
		isLoading: isModellerLoading,
		isFetching: isModellerFetching,
		refetch: refetchModeller,
	} = useQuery({
		...getModellerByMarkaIdQueryOptions(markaId),
		enabled: !!markaId && markaId.trim() !== "",
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
		!markaId ||
		isModellerLoading ||
		isModellerFetching ||
		modellerOptions.length === 0;

	return (
		<div className="max-w-6xl mx-auto p-6 space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">
					{mode === "create"
						? "Araç Filo Kayıt Formu"
						: "Araç Filo Güncelleme Formu"}
				</h1>
				<p className="text-muted-foreground">
					{mode === "create"
						? "Yeni araç bilgilerini eksiksiz doldurunuz"
						: "Araç bilgilerini yenisi ile güncelleyin"}
				</p>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
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
										if (!!value || value.trim() !== "") refetchModeller();
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
								}}
							>
								{(field) => (
									<field.Select
										label="Model"
										values={modellerOptions}
										placeholder="Model seçiniz"
										disabled={isModelSelectDisabled}
									/>
								)}
							</form.AppField>
							<form.AppField name="plaka">
								{(field) => (
									<field.TextField label="Plaka" placeholder="Plaka" />
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
							<div className="col-span-full">
								<form.AppField name="segment">
									{(field) => (
										<field.Select label="Segment" values={segmentOptions} />
									)}
								</form.AppField>
								<div className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
									{AracSegmentListesiYardımMetni[segment]}
								</div>
							</div>
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
							<form.AppField name="lastikTipi">
								{(field) => (
									<field.TextField
										label="Lastik Tipi"
										placeholder="Lastik Tipi"
									/>
								)}
							</form.AppField>
							<div className="col-span-full">
								<form.AppField name="kasaTipi">
									{(field) => (
										<field.Select label="Kasa Tipi" values={kasaTipiOptions} />
									)}
								</form.AppField>
							</div>
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
						<form.AppField name="muayeneBitisTarihi">
								{(field) => <field.DatePicker label="Muayene Bitiş Tarihi" />}
							</form.AppField>
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
						<form.AppField name="garantisiVarMi">
							{(field) => <field.Checkbox label="Garanti var mı?" />}
						</form.AppField>
						<div>
							<form.Subscribe selector={(state) => state.values.garantisiVarMi}>
								{(garantisiVarMi) => (
									<div className="flex flex-col w-full gap-3">
										<form.AppField name="garantiBaslangicTarihi">
											{(field) => (
												<field.DatePicker
													label="Garanti Başlangıç Tarihi"
													disabled={!garantisiVarMi}
												/>
											)}
										</form.AppField>
										<form.AppField name="garantiSuresiYil">
											{(field) => (
												<field.TextField
													label="Garanti Süresi (Yıl)"
													placeholder="Garanti Süresi (Yıl)"
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
								)}
							</form.Subscribe>
						</div>
					</CardContent>
				</Card>
				<div className="flex justify-end space-x-4">
					<Link
						to="/arac-filo"
						className={cn(buttonVariants({ variant: "outline" }))}
					>
						İptal
					</Link>
					<Button type="submit" disabled={isSubmitting || !canSubmit}>
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
