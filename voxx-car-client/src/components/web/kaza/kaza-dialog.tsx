import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAppForm } from "@/hooks/demo.form";
import {
	getKazalarByAracFiloIdQueryOptions,
	useCreateKazaMutation,
	useUpdateKazaMutation,
} from "@/hooks/use-kaza-hooks";
import {
	type Kaza,
	kazaCreateSchema,
	kazaUpdateSchema,
	type CreateKazaRequest,
} from "@/schemas/kaza";
import { RefreshCw } from "lucide-react";
import type { Firma } from "@/schemas/firma.ts";
import { useMemo } from "react";
import {
	KazaNedeniListesi,
	KazaNedeniListesiLabel,
	OnarimDurumuTipiListesi,
	OnarimDurumuTipiListesiLabel,
} from "@/enums";
import { useQueryClient } from "@tanstack/react-query";

interface KazaDialogCreateProps {
	mode: "create";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: { aracFiloId: string };
}

interface KazaDialogUpdateProps {
	mode: "update";
	open: boolean;
	close: () => void;
	aracFiloId: string;
	firmalar: Firma[];
	initialValues: Kaza;
}

type KazaDialogProps = KazaDialogCreateProps | KazaDialogUpdateProps;

export default function KazaDialog(props: KazaDialogProps) {
	const { mode, open, close, firmalar, aracFiloId } = props;
	const queryClient = useQueryClient();

	const onarimDurumuOptions = OnarimDurumuTipiListesi.map((onarimDurumu) => ({
		label: OnarimDurumuTipiListesiLabel[onarimDurumu],
		value: onarimDurumu,
	}));

	const kazaNedeniOptions = KazaNedeniListesi.map((kazaNedeni) => ({
		label: KazaNedeniListesiLabel[kazaNedeni],
		value: kazaNedeni,
	}));

	const firmalarOptions = useMemo(
		() =>
			firmalar.map((firma: Firma) => ({
				label: firma.unvan,
				value: firma.id,
			})),
		[firmalar],
	);

	const createKazaMutation = useCreateKazaMutation(close);
	const updateKazaMutation =
		mode === "create" ? null : useUpdateKazaMutation(close);

	const form = useAppForm({
		defaultValues:
			mode === "create"
				? {
						aracFiloId,
						firmaId: "",
						onarimDurumu: OnarimDurumuTipiListesi[0],
						kazaIli: "",
						kazaNedeni: "",
						kazaTarihi: new Date(),
						kazaTutanagi: "",
						musteriId: "",
						odeyenFirmaId: "",
					}
				: {
						...props.initialValues,
						kazaTarihi: new Date(props.initialValues.kazaTarihi),
					},
		validators: {
			// @ts-expect-error
			onChange: mode === "create" ? kazaCreateSchema : kazaUpdateSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				if (mode === "create") {
					await createKazaMutation.mutateAsync(value as CreateKazaRequest);
				} else if (mode === "update") {
					await updateKazaMutation!.mutateAsync(value as Kaza);
				}
				await queryClient.invalidateQueries(
					getKazalarByAracFiloIdQueryOptions(aracFiloId),
				);
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
						{mode === "create" ? "Yeni Kaza Ekle" : "Seçili Kazayı Güncelle"}
					</DialogTitle>
					<DialogDescription>
						{mode === "create"
							? "Yeni kaza eklemek için formu eksiksiz doldurunuz"
							: "Seçili Kazayı Güncelle"}
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
					<form.AppField name="firmaId">
						{(field) => <field.Select label="Firma" values={firmalarOptions} />}
					</form.AppField>

					<form.AppField name="odeyenFirmaId">
						{(field) => (
							<field.Select label="Ödeyen Firma" values={firmalarOptions} />
						)}
					</form.AppField>

					<form.AppField name="kazaTarihi">
						{(field) => <field.DatePicker label="Kaza Tarihi" />}
					</form.AppField>

					<form.AppField name="kazaIli">
						{(field) => <field.TextField label="Kaza İli" />}
					</form.AppField>

					<form.AppField name="kazaNedeni">
						{(field) => (
							<field.Select label="Kaza Nedeni" values={kazaNedeniOptions} />
						)}
					</form.AppField>

					<form.AppField name="kazaTutanagi">
						{(field) => <field.TextField label="Kaza Tutanağı" />}
					</form.AppField>

					<form.AppField name="onarimDurumu">
						{(field) => (
							<field.Select
								label="Onarım Durumu"
								values={onarimDurumuOptions}
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
									? createKazaMutation.isPending
									: updateKazaMutation!.isPending
							}
						>
							{mode === "create" ? (
								createKazaMutation.isPending
							) : updateKazaMutation!.isPending ? (
								<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
							) : null}
							{mode === "create" ? "Yeni Kaza Ekle" : "Seçili Kazayı Güncelle"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
