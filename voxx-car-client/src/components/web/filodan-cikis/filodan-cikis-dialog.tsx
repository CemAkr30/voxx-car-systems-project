import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	FilodanCikisNedeniListesi,
	FilodanCikisNedeniListesiLabel,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	getFilodanCikisByAracFiloIdQueryOptions,
	useCreateFilodanCikisMutation,
	useUpdateFilodanCikisMutation,
} from "@/hooks/use-filodan-cikis-hooks";
import {
	type FilodanCikis,
	filodanCikisCreateSchema,
	filodanCikisUpdateSchema,
	type CreateFilodanCikisRequest,
} from "@/schemas/filodan-cikis";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

interface FilodanCikisDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: { aracFiloId: string };
}

interface FilodanCikisDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	initialValues: FilodanCikis;
}

type FilodanCikisDialogProps =
	| FilodanCikisDialogCreateProps
	| FilodanCikisDialogUpdateProps;

export default function FilodanCikisDialog(props: FilodanCikisDialogProps) {
	const { mode, open, close, initialValues, aracFiloId } = props;
	const queryClient = useQueryClient();

	const filodanCikisNedeniOptions = FilodanCikisNedeniListesi.map(
		(filodanCikisNedeni) => ({
			label: FilodanCikisNedeniListesiLabel[filodanCikisNedeni],
			value: filodanCikisNedeni,
		}),
	);

	const createFilodanCikisMutation = useCreateFilodanCikisMutation(close);
	const updateFilodanCikisMutation =
		mode === "create" ? null : useUpdateFilodanCikisMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						filodanCikisNedeni: FilodanCikisNedeniListesi[0],
						filodanCikisTarihi: new Date(),
					}
				: {
						...props.initialValues,
						filodanCikisTarihi: new Date(
							props.initialValues.filodanCikisTarihi,
						),
					},
		validators: {
			// @ts-expect-error
			onChange:
				mode === "create" ? filodanCikisCreateSchema : filodanCikisUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createFilodanCikisMutation.mutateAsync(
						value as CreateFilodanCikisRequest,
					);
				} else if (mode === "update") {
					await updateFilodanCikisMutation!.mutateAsync(value as FilodanCikis);
				}
				formApi.reset();
				queryClient.invalidateQueries(
					getFilodanCikisByAracFiloIdQueryOptions(initialValues.aracFiloId),
				);
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
							? "Yeni FilodanCikis Ekle"
							: "Seçili FilodanCikisi Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni filodanCikis eklemek için formu eksiksiz doldurunuz"
							: "Seçili FilodanCikisi Güncelle"}
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
					<form.AppField name="filodanCikisNedeni">
						{(field) => (
							<field.Select
								label="Filodan çıkış nedeni"
								values={filodanCikisNedeniOptions}
							/>
						)}
					</form.AppField>

					<form.AppField name="filodanCikisTarihi">
						{(field) => <field.DatePicker label="Filodan çıkış tarihi" />}
					</form.AppField>

					<form.AppField name="alici">
						{(field) => <field.TextField label="Alıcı" />}
					</form.AppField>

					<form.AppField name="aciklama">
						{(field) => <field.TextArea label="Açıklama" />}
					</form.AppField>

					<form.AppField name="faturaYukle">
						{(field) => <field.TextField label="Fatura" />}
					</form.AppField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<form.AppField name="anahtarTeslimFiyati">
							{(field) => (
								<field.TextField type="number" label="Anahtar Teslim Fiyatı" />
							)}
						</form.AppField>
						<form.AppField name="aracDevirGiderleri">
							{(field) => (
								<field.TextField type="number" label="Arac Devir Giderleri" />
							)}
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
									? createFilodanCikisMutation.isPending
									: updateFilodanCikisMutation!.isPending
							}
						>
							{mode === "create" ? (
								createFilodanCikisMutation.isPending
							) : updateFilodanCikisMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create"
								? "Yeni Filodan Çıkış Ekle"
								: "Seçili Filodan Çıkışı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
