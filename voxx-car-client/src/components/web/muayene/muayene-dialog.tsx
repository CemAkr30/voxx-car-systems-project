import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	MuayeneTipiListesi,
	MuayeneTipiListesiLabel,
	OdemeTipiListesi,
	OdemeTipiListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	useCreateMuayeneMutation,
	useUpdateMuayeneMutation,
} from "@/hooks/use-muayene-hooks";
import type { Firma } from "@/schemas/firma";
import {
	muayeneCreateSchema,
	muayeneUpdateSchema,
	type CreateMuayeneRequest,
	type Muayene,
} from "@/schemas/muayene";
import { RefreshCw } from "lucide-react";
import React, { useMemo } from "react";

interface MuayeneDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: { aracFiloId: string };
}

interface MuayeneDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: Muayene;
}

type MuayeneDialogProps = MuayeneDialogCreateProps | MuayeneDialogUpdateProps;

export default function MuayeneDialog(props: MuayeneDialogProps) {
	const { mode, open, close, firmalar, aracFiloId } = props;

	const odemeTipiOptions = OdemeTipiListesi.map((tip) => ({
		label: OdemeTipiListesiLabel[tip],
		value: tip,
	}));

	const muayeneTipiOptions = MuayeneTipiListesi.map((tip) => ({
		label: MuayeneTipiListesiLabel[tip],
		value: tip,
	}));

	const firmalarOptions = useMemo(
		() =>
			firmalar.map((firma: Firma) => ({
				label: firma.unvan,
				value: firma.id,
			})),
		[firmalar],
	);

	const createMuayeneMutation = useCreateMuayeneMutation(close);
	const updateMuayeneMutation =
		mode === "create" ? null : useUpdateMuayeneMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						makbuzNo: "",
						miktar: 0,
						odemeTipi: OdemeTipiListesi[9],
						muayeneTipi: MuayeneTipiListesi[0],
						odeyenFirmaId: "",
						odendi: false,
						gecikmeCezasi: "",
						aciklama: "",
						baslangicTarihi: new Date(),
						bitisTarihi: new Date(),
						yeri: "",
					}
				: {
						...props.initialValues,
						baslangicTarihi: new Date(props.initialValues.baslangicTarihi),
						bitisTarihi: new Date(props.initialValues.bitisTarihi),
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? muayeneCreateSchema : muayeneUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createMuayeneMutation.mutateAsync(
						value as CreateMuayeneRequest,
					);
				} else if (mode === "update") {
					await updateMuayeneMutation!.mutateAsync(value as Muayene);
				}
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
							? "Yeni Muayene Ekle"
							: "Seçili Muayeneyı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni muayene eklemek için formu eksiksiz doldurunuz"
							: "Seçili Muayeneyı Güncelle"}
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
						<form.AppField name="makbuzNo">
							{(field) => <field.TextField label="Makbuz no" />}
						</form.AppField>

						<form.AppField name="miktar">
							{(field) => <field.TextField label="Miktar" />}
						</form.AppField>
					</div>

					<form.AppField name="muayeneTipi">
						{(field) => (
							<field.Select label="Muayene Tipi" values={muayeneTipiOptions} />
						)}
					</form.AppField>

					<form.AppField
						name="odendi"
						listeners={{
							onChange: ({ value }) => {
								if (!value) {
									form.setFieldValue("odemeTipi", "ODENMEDI");
									form.setFieldValue("odeyenFirmaId", "");
									form.setFieldValue("gecikmeCezasi", "");
								}
							},
						}}
					>
						{(field) => <field.Checkbox label="Ödendi" />}
					</form.AppField>

					<form.Subscribe selector={(state) => state.values.odendi}>
						{(odendi) => (
							<React.Fragment>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									<form.AppField name="odemeTipi">
										{(field) => (
											<field.Select
												label="Ödeme Tipi"
												values={odemeTipiOptions}
												disabled={!odendi}
											/>
										)}
									</form.AppField>

									<form.AppField name="odeyenFirmaId">
										{(field) => (
											<field.Select
												label="Ödeyen Firma"
												values={firmalarOptions}
												disabled={!odendi}
											/>
										)}
									</form.AppField>
								</div>

								<form.AppField name="gecikmeCezasi">
									{(field) => (
										<field.TextField
											label="Gecikme Cezası"
											disabled={!odendi}
										/>
									)}
								</form.AppField>
							</React.Fragment>
						)}
					</form.Subscribe>

					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>

					<form.AppField name="yeri">
						{(field) => <field.TextField label="Yeri" />}
					</form.AppField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="baslangicTarihi">
							{(field) => <field.DatePicker label="Başlangıç Tarihi" />}
						</form.AppField>

						<form.AppField name="bitisTarihi">
							{(field) => <field.DatePicker label="Bitiş Tarihi" />}
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
									? createMuayeneMutation.isPending
									: updateMuayeneMutation!.isPending
							}
						>
							{mode === "create" ? (
								createMuayeneMutation.isPending
							) : updateMuayeneMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Muayene Ekle"
								: "Seçili Muayeneyı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
