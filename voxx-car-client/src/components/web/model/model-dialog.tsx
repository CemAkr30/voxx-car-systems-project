import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
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
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Yeni Model Ekle" : "Modeli Güncelle"}
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
					<form.AppField name="markaId">
						{(field) => <field.Select label="Marka" values={markalarOptions} />}
					</form.AppField>

					<form.AppField name="adi">
						{(field) => <field.TextField label="Model Adı" />}
					</form.AppField>

					<div className="flex justify-end">
						<form.AppForm>
							<form.SubscribeButton
								label={
									mode === "create" ? "Yeni Model Ekle" : "Modeli Güncelle"
								}
							/>
						</form.AppForm>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
