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
	getMarkalarQueryOptions,
	useCreateMarkaMutation,
	useUpdateMarkaMutation,
} from "@/hooks/use-marka-hooks";
import {
	markaCreateSchema,
	markaUpdateSchema,
	type CreateMarkaRequest,
	type Marka,
} from "@/schemas/marka";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface MarkaDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
}

interface MarkaDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	initialValues: Marka;
}

type MarkaDialogProps = MarkaDialogCreateProps | MarkaDialogUpdateProps;

export default function MarkaDialog(props: MarkaDialogProps) {
	const { mode, open, close } = props;
	const queryClient = useQueryClient();

	const createMarkaMutation = useCreateMarkaMutation(close);
	const updateMarkaMutation =
		mode === "create" ? null : useUpdateMarkaMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						adi: "",
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? markaCreateSchema : markaUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createMarkaMutation.mutateAsync(value as CreateMarkaRequest);
					queryClient.invalidateQueries({
						queryKey: getMarkalarQueryOptions().queryKey,
					});
				} else if (mode === "update") {
					await updateMarkaMutation!.mutateAsync(value as Marka);
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
						{mode === "create" ? "Yeni Marka Ekle" : "Seçili Markayı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni marka eklemek için formu eksiksiz doldurunuz"
							: "Seçili Markayı Güncelle"}
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
					<form.AppField name="adi">
						{(field) => <field.TextField label="Marka Adı" />}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							disabled={
								mode === "create"
									? createMarkaMutation.isPending
									: updateMarkaMutation!.isPending
							}
						>
							{mode === "create" ? (
								createMarkaMutation.isPending
							) : updateMarkaMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Marka Ekle"
								: "Seçili Markayı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
