import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { AdresTipi } from "@/enums";
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

interface AdresDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
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

	const createAdresMutation = useCreateAdresMutation(close);
	const updateAdresMutation =
		mode === "create" ? null : useUpdateAdresMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aciklama: "",
						firmaId: "",
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
			} catch (error) {}
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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Yeni Adres Ekle" : "Adresyı Güncelle"}
					</DialogTitle>
					<DialogDescription>Açıklama</DialogDescription>
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
						{(field) => <field.TextField label="Firma Id" />}
					</form.AppField>
					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>
					<form.AppField name="tip">
						{(field) => <field.TextField label="Tip" />}
					</form.AppField>

					<div className="flex justify-end">
						<form.AppForm>
							<form.SubscribeButton
								label={
									mode === "create" ? "Yeni Adres Ekle" : "Adresyı Güncelle"
								}
							/>
						</form.AppForm>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
