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
	useCreateModelMutation,
	useUpdateModelMutation,
} from "@/hooks/use-model-hooks";
import type { Marka } from "@/schemas/marka";
import {
	modelCreateSchema,
	modelUpdateSchema,
	type CreateModelRequest,
	type Model,
} from "@/schemas/model";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

interface ModelDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	markalar: Marka[];
}

interface ModelDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	markalar: Marka[];
	initialValues: Model;
}

type ModelDialogProps = ModelDialogCreateProps | ModelDialogUpdateProps;

export default function ModelDialog(props: ModelDialogProps) {
	const { mode, open, close, markalar } = props;

	const markalarOptions = useMemo(
		() => markalar.map((marka) => ({ label: marka.adi, value: marka.id })),
		[markalar],
	);

	const createModelMutation = useCreateModelMutation(close);
	const updateModelMutation =
		mode === "create" ? null : useUpdateModelMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						adi: "",
						markaId: "",
					}
				: props.initialValues,
		validators: {
			onChange: mode === "create" ? modelCreateSchema : modelUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createModelMutation.mutateAsync(value as CreateModelRequest);
				} else if (mode === "update") {
					await updateModelMutation!.mutateAsync(value as Model);
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
						{mode === "create" ? "Yeni Model Ekle" : "Seçili Modeli Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create" ? "Yeni model eklemek için formu eksiksiz doldurunuz" : "Seçili Modeli Güncelle"}
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
					<form.AppField name="markaId">
						{(field) => <field.Select label="Marka" values={markalarOptions} />}
					</form.AppField>

					<form.AppField name="adi">
						{(field) => <field.TextField label="Model Adı" />}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							disabled={
								mode === "create"
									? createModelMutation.isPending
									: updateModelMutation!.isPending
							}
						>
							{mode === "create" ? (
								createModelMutation.isPending
							) : updateModelMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Model Ekle" : "Seçili Modeli Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
