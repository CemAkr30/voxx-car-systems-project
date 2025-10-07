import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useAppForm } from "@/hooks/demo.form";
import {
	getKiralananAracFilolarByFirmaIdQueryOptions,
	useCreateAracKiralaMutation,
} from "@/hooks/use-arac-kirala-hooks";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import type { AracFilo } from "@/schemas/arac-filo";
import {
	aracKiralaCreateSchema,
	type CreateAracKiralaRequest,
} from "@/schemas/arac-kirala";
import type { Firma } from "@/schemas/firma";
import { useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface FirmayaAracKiralaDialogCreateProps {
	mode: "firma";
	open: boolean;
	close: () => void;
	kiralanabilenAraclar: AracFilo[];
	initialValues: { firmaId: string; aracFiloId: string };
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
	const queryClient = useQueryClient();

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

	const form = useAppForm({
		defaultValues: {
			...initialValues,
			aylikFaturaTutari: 0,
			sozlesmeTutari: 0,
			kapora: 0,
			baslangicTarihi: new Date(),
			bitisTarihi: new Date(),
		},
		validators: {
			onChange: aracKiralaCreateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				await createAracKiralaMutation.mutateAsync(
					value as CreateAracKiralaRequest,
				);

				queryClient.invalidateQueries(
					getKiralananAracFilolarByFirmaIdQueryOptions(initialValues.firmaId),
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
					<DialogTitle>Yeni Araç Kirala</DialogTitle>
					<DialogDescription>Yeni araç kirala</DialogDescription>
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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="baslangicTarihi">
							{(field) => <field.DatePicker label="Başlangıç Tarihi" />}
						</form.AppField>

						<form.AppField name="bitisTarihi">
							{(field) => <field.DatePicker label="Bitiş Tarihi" />}
						</form.AppField>
					</div>

					<form.AppField name="aylikFaturaTutari">
						{(field) => <field.TextField label="Aylık Fatura Tutarı" />}
					</form.AppField>

					<form.AppField name="sozlesmeTutari">
						{(field) => <field.TextField label="Sözleşme Tutarı" />}
					</form.AppField>

					<form.AppField name="kapora">
						{(field) => <field.TextField label="Vade (Gün)" />}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button type="submit" disabled={createAracKiralaMutation.isPending}>
							{createAracKiralaMutation.isPending}
							Aracı Kirala
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
