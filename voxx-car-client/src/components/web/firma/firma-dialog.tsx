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
	getFirmalarQueryOptions,
	useCreateFirmaMutation,
	useUpdateFirmaMutation,
} from "@/hooks/use-firma-hooks";
import {
	firmaCreateSchema,
	firmaUpdateSchema,
	type CreateFirmaRequest,
	type Firma,
} from "@/schemas/firma";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface FirmaDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
}

interface FirmaDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Firma;
}

type FirmaDialogProps = FirmaDialogCreateProps | FirmaDialogUpdateProps;

export default function FirmaDialog(props: FirmaDialogProps) {
	const { mode, open, close } = props;
	const queryClient = useQueryClient();

	const createFirmaMutation = useCreateFirmaMutation(close);
	const updateFirmaMutation =
		mode === "create" ? null : useUpdateFirmaMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						unvan: "",
						vergiNo: "",
						email: "",
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? firmaCreateSchema : firmaUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createFirmaMutation.mutateAsync(value as CreateFirmaRequest);
				} else if (mode === "update") {
					await updateFirmaMutation!.mutateAsync(value as Firma);
				}
				queryClient.invalidateQueries(getFirmalarQueryOptions());
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
						{mode === "create" ? "Yeni Firma Ekle" : "Seçili Firmayı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni firma eklemek için formu eksiksiz doldurunuz"
							: "Seçili Firmayı Güncelle"}
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
					<form.AppField name="unvan">
						{(field) => <field.TextField label="Firma Adı" />}
					</form.AppField>

					<form.AppField name="vergiNo">
						{(field) => <field.TextField label="Vergi Numarası" />}
					</form.AppField>

					<form.AppField name="email">
						{(field) => (
							<field.TextField label="Firma Mail Adres" type="email" />
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
									? createFirmaMutation.isPending
									: updateFirmaMutation!.isPending
							}
						>
							{mode === "create" ? (
								createFirmaMutation.isPending
							) : updateFirmaMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Firma Ekle"
								: "Seçili Firmayı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
