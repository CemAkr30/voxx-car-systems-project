import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { SigortaTipiListesi, SigortaTipiListesiLabel } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	useCreateSigortaMutation,
	useUpdateSigortaMutation,
} from "@/hooks/use-sigorta-hooks";
import {
	sigortaCreateSchema,
	sigortaUpdateSchema,
	type CreateSigortaRequest,
	type Sigorta,
} from "@/schemas/sigorta";
import { RefreshCw } from "lucide-react";

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

	const sigortaTipiOptions = SigortaTipiListesi.map((tip) => ({
		label: SigortaTipiListesiLabel[tip],
		value: tip,
	}));

	const createSigortaMutation = useCreateSigortaMutation(close);
	const updateSigortaMutation =
		mode === "create" ? null : useUpdateSigortaMutation(close);

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
				if (mode === "create") {
					await createSigortaMutation.mutateAsync(
						value as CreateSigortaRequest,
					);
				} else if (mode === "update") {
					await updateSigortaMutation!.mutateAsync(value as Sigorta);
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
