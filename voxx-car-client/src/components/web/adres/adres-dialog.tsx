import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { AdresTipiListesi } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	useCreateAdresMutation,
	useUpdateAdresMutation,
} from "@/hooks/use-adres-hooks";
import {
	type CreateAdresRequest,
	type Adres,
	adresCreateSchema,
	adresUpdateSchema,
} from "@/schemas/adres";
import { RefreshCw } from "lucide-react";

interface AdresDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	initialValues: { firmaId: string };
}

interface AdresDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Adres;
}

type AdresDialogProps = AdresDialogCreateProps | AdresDialogUpdateProps;

export default function AdresDialog(props: AdresDialogProps) {
	const { mode, open, close } = props;

	const adresTipiOptions = AdresTipiListesi.map((tip) => ({
		label: tip,
		value: tip,
	}));

	const createAdresMutation = useCreateAdresMutation(close);
	const updateAdresMutation =
		mode === "create" ? null : useUpdateAdresMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						...props.initialValues,
						aciklama: "",
						tip: "",
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? adresCreateSchema : adresUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createAdresMutation.mutateAsync(value as CreateAdresRequest);
				} else if (mode === "update") {
					await updateAdresMutation!.mutateAsync(value as Adres);
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
						{mode === "create" ? "Yeni Adres Ekle" : "Seçili Adresi Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni adres eklemek için formu eksiksiz doldurunuz"
							: "Seçili Adresi Güncelle"}
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
					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>
					<form.AppField name="tip">
						{(field) => (
							<field.Select label="Adres Tipi" values={adresTipiOptions} />
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
									? createAdresMutation.isPending
									: updateAdresMutation!.isPending
							}
						>
							{mode === "create" ? (
								createAdresMutation.isPending
							) : updateAdresMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Adres Ekle" : "Seçili Adresi Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
