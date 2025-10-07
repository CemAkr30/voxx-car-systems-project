import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	BakimNedeniTipiListesi,
	BakimNedeniTipiListesiLabel,
	OdemeYapanFirmaListesi,
	OdemeYapanFirmaListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getBakimlarByAracFiloIdQueryOptions,
	useCreateBakimMutation,
	useUpdateBakimMutation,
} from "@/hooks/use-bakim-hooks";
import {
	type Bakim,
	bakimCreateSchema,
	bakimUpdateSchema,
	type CreateBakimRequest,
} from "@/schemas/bakim";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface BakimDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: { aracFiloId: string };
}

interface BakimDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: Bakim;
}

type BakimDialogProps = BakimDialogCreateProps | BakimDialogUpdateProps;

export default function BakimDialog(props: BakimDialogProps) {
	const { mode, open, close, aracFiloId } = props;
	const queryClient = useQueryClient();

	const bakimNedeniTipiOptions = BakimNedeniTipiListesi.map((bakimNedeni) => ({
		label: BakimNedeniTipiListesiLabel[bakimNedeni],
		value: bakimNedeni,
	}));

	const bakimOdeyenOptions = OdemeYapanFirmaListesi.map((firma) => ({
		label: OdemeYapanFirmaListesiLabel[firma],
		value: firma,
	}));

	const createBakimMutation = useCreateBakimMutation(close);
	const updateBakimMutation =
		mode === "create" ? null : useUpdateBakimMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						bakimNedeni: BakimNedeniTipiListesi[0],
						parca: "",
						parcaAdedi: 0,
						parcaTutari: 0,
						iscilikTutari: 0,
						bakimAraligi: 0,
						aracGuncelKm: 0,
						faturaNo: "",
						fatura: "",
						aciklama: "",
						bakimOdeyenFirma: OdemeYapanFirmaListesi[5],
					}
				: {
						...props.initialValues,
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? bakimCreateSchema : bakimUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createBakimMutation.mutateAsync(value as CreateBakimRequest);
				} else if (mode === "update") {
					await updateBakimMutation!.mutateAsync(value as Bakim);
				}
				await queryClient.invalidateQueries(
					getBakimlarByAracFiloIdQueryOptions(aracFiloId),
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
						{mode === "create" ? "Yeni Bakim Ekle" : "Seçili Bakimi Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni bakim eklemek için formu eksiksiz doldurunuz"
							: "Seçili Bakimi Güncelle"}
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
						<form.AppField name="bakimNedeni">
							{(field) => (
								<field.Select
									label="Bakim nedeni Tipi"
									values={bakimNedeniTipiOptions}
								/>
							)}
						</form.AppField>

						<form.AppField name="parca">
							{(field) => <field.TextField label="Parça" />}
						</form.AppField>

						<form.AppField name="parcaAdedi">
							{(field) => <field.TextField label="Parça Adedi" />}
						</form.AppField>

						<form.AppField name="parcaTutari">
							{(field) => <field.TextField label="Parça tutarı" />}
						</form.AppField>

						<form.AppField name="iscilikTutari">
							{(field) => <field.TextField label="İşçilik tutarı" />}
						</form.AppField>

						<form.AppField name="faturaNo">
							{(field) => <field.TextField label="Fatura numarası" />}
						</form.AppField>
					</div>

					<form.AppField name="bakimAraligi">
						{(field) => <field.TextField label="Bakım Aralığı (km)" />}
					</form.AppField>

					<form.AppField name="aracGuncelKm">
						{(field) => <field.TextField label="Araç Güncel Kilometre" />}
					</form.AppField>

					<form.AppField name="fatura">
						{(field) => <field.TextField label="Fatura" />}
					</form.AppField>

					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>

					<form.AppField name="bakimOdeyenFirma">
						{(field) => (
							<field.Select label="Ödeyen Firma" values={bakimOdeyenOptions} />
						)}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							disabled={
								mode === "create"
									? createBakimMutation.isPending
									: updateBakimMutation!.isPending
							}
						>
							{mode === "create" ? (
								createBakimMutation.isPending
							) : updateBakimMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Bakım Ekle" : "Seçili Bakımı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
