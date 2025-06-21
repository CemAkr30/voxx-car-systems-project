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
import type { Firma } from "@/schemas/firma";
import { useMemo } from "react";

interface AdresDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	initialValues: { firmaId: string };
	firmalar: Firma[];
}

interface AdresDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Adres;
	firmalar: Firma[];
}

type AdresDialogProps = AdresDialogCreateProps | AdresDialogUpdateProps;

export default function AdresDialog(props: AdresDialogProps) {
	const { mode, open, close, firmalar } = props;

	const firmalarOptions = useMemo(
		() => firmalar.map((firma) => ({ label: firma.unvan, value: firma.id })),
		[firmalar],
	);

	const adresTipiOptions = AdresTipi.map((tip) => ({ label: tip, value: tip }));

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
						{(field) => <field.Select label="Firma" values={firmalarOptions} />}
					</form.AppField>
					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>
					<form.AppField name="tip">
						{(field) => (
							<field.Select label="Adres Tipi" values={adresTipiOptions} />
						)}
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
