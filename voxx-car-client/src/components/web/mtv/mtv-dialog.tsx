import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { OdemeTipiListesi, OdemeTipiListesiLabel } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getMtvlerByAracFiloIdQueryOptions,
	useCreateMtvMutation,
	useUpdateMtvMutation,
} from "@/hooks/use-mtv-hooks";
import type { Firma } from "@/schemas/firma";
import {
	mtvCreateSchema,
	mtvUpdateSchema,
	type CreateMtvRequest,
	type Mtv,
} from "@/schemas/mtv";
import { useStore } from "@tanstack/react-form";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import React, { useMemo } from "react";

interface MtvDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: { aracFiloId: string };
}

interface MtvDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: Mtv;
}

type MtvDialogProps = MtvDialogCreateProps | MtvDialogUpdateProps;

export default function MtvDialog(props: MtvDialogProps) {
	const { mode, open, close, initialValues, firmalar, aracFiloId } = props;
	const queryClient = useQueryClient();

	const odemeTipiOptions = OdemeTipiListesi.map((tip) => ({
		label: OdemeTipiListesiLabel[tip],
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

	const createMtvMutation = useCreateMtvMutation(close);
	const updateMtvMutation =
		mode === "create" ? null : useUpdateMtvMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						yil: "",
						taksit: "",
						makbuzNo: "",
						miktar: 0,
						odemeTipi: OdemeTipiListesi[9],
						odeyenFirmaId: "",
						odendi: false,
						gecikmeCezasi: "",
						aciklama: "",
					}
				: {
						...props.initialValues,
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? mtvCreateSchema : mtvUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createMtvMutation.mutateAsync(value as CreateMtvRequest);
				} else if (mode === "update") {
					await updateMtvMutation!.mutateAsync(value as Mtv);
				}
				formApi.reset();
				queryClient.invalidateQueries(
					getMtvlerByAracFiloIdQueryOptions(initialValues.aracFiloId),
				);
			} catch (_error) {}
		},
	});

	const values = useStore(form.store, (selector) => selector.values);

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
						{mode === "create" ? "Yeni Mtv Ekle" : "Seçili Mtvyı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni mtv eklemek için formu eksiksiz doldurunuz"
							: "Seçili Mtvyı Güncelle"}
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						console.log(values);
						mtvCreateSchema.parse(values);
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.AppField name="yil">
						{(field) => <field.TextField label="Yıl" />}
					</form.AppField>

					<form.AppField name="taksit">
						{(field) => <field.TextField label="Taksit" />}
					</form.AppField>

					<form.AppField name="makbuzNo">
						{(field) => <field.TextField label="Makbuz no" />}
					</form.AppField>

					<form.AppField name="miktar">
						{(field) => <field.TextField label="Miktar" />}
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

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createMtvMutation.isPending
									: updateMtvMutation!.isPending
							}
						>
							{mode === "create" ? (
								createMtvMutation.isPending
							) : updateMtvMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Mtv Ekle" : "Seçili Mtvyı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
