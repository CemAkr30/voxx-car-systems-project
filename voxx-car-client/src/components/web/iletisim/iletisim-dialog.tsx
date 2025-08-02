import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { IletisimTipiListesi, IletisimTipiListesiLabel } from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	useCreateIletisimMutation,
	useUpdateIletisimMutation,
} from "@/hooks/use-iletisim-hooks";
import {
	type CreateIletisimRequest,
	type Iletisim,
	iletisimCreateSchema,
	iletisimUpdateSchema,
} from "@/schemas/iletisim";
import { RefreshCw } from "lucide-react";

interface IletisimDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	initialValues: { firmaId: string };
}

interface IletisimDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Iletisim;
}

type IletisimDialogProps =
	| IletisimDialogCreateProps
	| IletisimDialogUpdateProps;

export default function IletisimDialog(props: IletisimDialogProps) {
	const { mode, open, close } = props;

	const iletisimTipiOptions = IletisimTipiListesi.map((tip) => ({
		label: IletisimTipiListesiLabel[tip],
		value: tip,
	}));

	const createIletisimMutation = useCreateIletisimMutation(close);
	const updateIletisimMutation =
		mode === "create" ? null : useUpdateIletisimMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						...props.initialValues,
						numara: "",
						tip: "",
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? iletisimCreateSchema : iletisimUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createIletisimMutation.mutateAsync(
						value as CreateIletisimRequest,
					);
				} else if (mode === "update") {
					await updateIletisimMutation!.mutateAsync(value as Iletisim);
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
							? "Yeni Iletisim Ekle"
							: "Seçili Iletisimi Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni iletisim eklemek için formu eksiksiz doldurunuz"
							: "Seçili Iletisimi Güncelle"}
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
					<form.AppField name="numara">
						{(field) => <field.TextField label="Numara" />}
					</form.AppField>
					<form.AppField name="tip">
						{(field) => (
							<field.Select
								label="Iletisim Tipi"
								values={iletisimTipiOptions}
							/>
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
									? createIletisimMutation.isPending
									: updateIletisimMutation!.isPending
							}
						>
							{mode === "create" ? (
								createIletisimMutation.isPending
							) : updateIletisimMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Iletisim Ekle"
								: "Seçili Iletisimi Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
