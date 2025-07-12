import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	HasarliParcaListesiLabel,
	HasarTipiListesi,
	HasarTipiListesiLabel,
	type HasarliParca,
} from "@/enums";
import { useAppForm } from "@/hooks/demo.form";
import {
	hasarCreateSchema,
	hasarUpdateSchema,
	type Hasar,
} from "@/schemas/hasar";
import type { Dispatch, SetStateAction } from "react";

interface HasarDialogCreateProps {
	mode: "create";
	aracFiloId: string;
	open: boolean;
	close: () => void;
	hasarliParca: HasarliParca;
	setSelectedPart: Dispatch<SetStateAction<HasarliParca | null>>;
	setSelectedParts: Dispatch<SetStateAction<Hasar[]>>;
}

interface HasarDialogUpdateProps {
	mode: "update";
	aracFiloId: string;
	open: boolean;
	close: () => void;
	hasarliParca: HasarliParca;
	initialValues: Hasar;
	setSelectedPart: Dispatch<SetStateAction<HasarliParca | null>>;
	setSelectedParts: Dispatch<SetStateAction<Hasar[]>>;
}

type HasarDialogProps = HasarDialogCreateProps | HasarDialogUpdateProps;

export default function HasarDialog(props: HasarDialogProps) {
	const {
		mode,
		open,
		close,
		aracFiloId,
		hasarliParca,
		setSelectedPart,
		setSelectedParts,
	} = props;

	const hasarTipiOptions = HasarTipiListesi.slice(
		0,
		HasarTipiListesi.length - 1,
	).map((tip) => ({
		label: HasarTipiListesiLabel[tip],
		value: tip,
	}));

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						hasarliParca,
						hasarTipi: HasarTipiListesi[4],
					}
				: props.initialValues,
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? hasarCreateSchema : hasarUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					setSelectedParts((prevState) => [
						...prevState,
						{
							id: `new-id-${new Date().getTime()}`,
							aracFiloId,
							hasarliParca: value.hasarliParca,
							hasarTipi: value.hasarTipi,
							createdAt: new Date().toDateString(),
							updatedAt: new Date().toDateString(),
						},
					]);
				} else if (mode === "update") {
					setSelectedParts((prevState) =>
						prevState.map((part) =>
							part.hasarliParca === value.hasarliParca
								? {
										...part,
										hasarTipi: value.hasarTipi,
										updatedAt: new Date().toDateString(),
									}
								: part,
						),
					);
				}
				setSelectedPart(null);
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
						{`${mode === "create" ? "Yeni Hasar Ekle" : "Seçili Hasarı Güncelle"} - ${HasarliParcaListesiLabel[hasarliParca]}`}
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.AppField name="hasarTipi">
						{(field) => (
							<field.Select label="Hasar Tipi" values={hasarTipiOptions} />
						)}
					</form.AppField>

					<DialogFooter>
						<Button variant="outline" onClick={close}>
							İptal
						</Button>
						<Button
							type="submit"
							// disabled={
							// 	mode === "create"
							// 		? createHasarMutation.isPending
							// 		: updateHasarMutation!.isPending
							// }
						>
							{/* {mode === "create" ? (
								createHasarMutation.isPending
							) : updateHasarMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null} */}
							{mode === "create"
								? "Yeni Hasar Ekle"
								: "Seçili Hasaryı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
