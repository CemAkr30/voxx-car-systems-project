import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { CinsiyetTipi, EhliyetTipi } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	useCreateAracKullananMutation,
	useUpdateAracKullananMutation,
} from "@/hooks/use-arac-kullanan-hooks";
import {
	type CreateAracKullananRequest,
	type AracKullanan,
	aracKullananCreateSchema,
	aracKullananUpdateSchema,
} from "@/schemas/arac-kullanan";
import type { Firma } from "@/schemas/firma";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

interface AracKullananDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	initialValues: { firmaId: string };
	firmalar: Firma[];
}

interface AracKullananDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: AracKullanan;
	firmalar: Firma[];
}

type AracKullananDialogProps =
	| AracKullananDialogCreateProps
	| AracKullananDialogUpdateProps;

export default function AracKullananDialog(props: AracKullananDialogProps) {
	const { mode, open, close, firmalar } = props;

	const firmalarOptions = useMemo(
		() => firmalar.map((firma) => ({ label: firma.unvan, value: firma.id })),
		[firmalar],
	);

	const cinsiyetTipiOptions = CinsiyetTipi.map((cinsiyet) => ({
		label: cinsiyet,
		value: cinsiyet,
	}));

	const ehliyetTipiOptions = EhliyetTipi.map((ehliyet) => ({
		label: ehliyet,
		value: ehliyet,
	}));

	const createAracKullananMutation = useCreateAracKullananMutation(
		props.initialValues.firmaId,
		close,
	);
	const updateAracKullananMutation =
		mode === "create"
			? null
			: useUpdateAracKullananMutation(props.initialValues.firmaId, close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						...props.initialValues,
						ad: "",
						soyad: "",
						adres: "",
						email: "",
						cinsiyetTipi: "",
						ehliyetTipi: "",
						ehliyetOn: "on",
						ehliyetArka: "arka",
						telefonNo: "",
						ehliyetNo: "",
					}
				: props.initialValues,
		validators: {
			onChange:
				mode === "create" ? aracKullananCreateSchema : aracKullananUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createAracKullananMutation.mutateAsync(
						value as CreateAracKullananRequest,
					);
				} else if (mode === "update") {
					await updateAracKullananMutation!.mutateAsync(value as AracKullanan);
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
						{mode === "create" ? "Yeni Araç Kullanan Ekle" : "Seçili Araç Kullananı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create" ? "Yeni araç kullanan eklemek için formu eksiksiz doldurunuz" : "Seçili Araç Kullananı Güncelle"}
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
					<form.AppField name="firmaId">
						{(field) => <field.Select label="Firma" values={firmalarOptions} />}
					</form.AppField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="ad">
							{(field) => <field.TextField label="İsim" />}
						</form.AppField>
						<form.AppField name="soyad">
							{(field) => <field.TextField label="Soyisim" />}
						</form.AppField>
					</div>
					<form.AppField name="email">
						{(field) => <field.TextField label="Email" type="email" />}
					</form.AppField>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="telefonNo">
							{(field) => <field.TextField label="Telefon Numarası" />}
						</form.AppField>
						<form.AppField name="ehliyetNo">
							{(field) => <field.TextField label="Ehliyet Numarası" />}
						</form.AppField>
						<form.AppField name="ehliyetTipi">
							{(field) => (
								<field.Select
									label="Ehliyet Tipi"
									values={ehliyetTipiOptions}
								/>
							)}
						</form.AppField>
						<form.AppField name="cinsiyetTipi">
							{(field) => (
								<field.Select label="Cinsiyet" values={cinsiyetTipiOptions} />
							)}
						</form.AppField>
					</div>

					<form.AppField name="ehliyetBitisTarihi">
						{(field) => <field.DatePicker label="Ehliyet Bitiş Tarihi" />}
					</form.AppField>

					<form.AppField name="adres">
						{(field) => <field.TextArea label="Adres" />}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							disabled={
								mode === "create"
									? createAracKullananMutation.isPending
									: updateAracKullananMutation!.isPending
							}
						>
							{mode === "create" ? (
								createAracKullananMutation.isPending
							) : updateAracKullananMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Araç Kullanan Ekle" : "Seçili Araç Kullananı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
