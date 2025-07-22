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
	getKazaByAracFiloIdQueryOptions,
	useCreateKazaMutation,
	useUpdateKazaMutation,
} from "@/hooks/use-kaza-hooks";
import {
	type Kaza,
	kazaCreateSchema,
	kazaUpdateSchema,
	type CreateKazaRequest,
} from "@/schemas/kaza";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import type { Firma } from "@/schemas/firma.ts";
import { useMemo } from "react";
import { OnarimDurumuTipiListesi, OnarimDurumuTipiListesiLabel } from "@/enums";
import { useStore } from "@tanstack/react-form";
import { getAracKullananlarByFirmaIdQueryOptions } from "@/hooks/use-arac-kullanan-hooks";
import type { AracKullanan } from "@/schemas/arac-kullanan";

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
	const { mode, open, close, initialValues, firmalar, aracFiloId } = props;
	const queryClient = useQueryClient();

	const onarimDurumuOptions = OnarimDurumuTipiListesi.map((onarimDurumu) => ({
		label: OnarimDurumuTipiListesiLabel[onarimDurumu],
		value: onarimDurumu,
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
				formApi.reset();
				queryClient.invalidateQueries(
					getKazaByAracFiloIdQueryOptions(initialValues.aracFiloId),
				);
			} catch (_error) {}
		},
	});

	const { odeyenFirmaId } = useStore(form.store, (state) => ({
		odeyenFirmaId: state.values.odeyenFirmaId,
	}));

	const {
		data: aracKullananlar,
		isLoading: isAracKullananlarLoading,
		isFetching: isAracKullananlarFetching,
		refetch: refetchAracKullananlar,
	} = useQuery({
		...getAracKullananlarByFirmaIdQueryOptions(odeyenFirmaId),
		enabled: !!odeyenFirmaId && odeyenFirmaId.trim() !== "",
		refetchOnMount: true,
		retry: (failureCount) => failureCount < 3,
	});

	const aracKullananlarOptions = useMemo(() => {
		if (!aracKullananlar || !Array.isArray(aracKullananlar)) {
			return [];
		}
		return aracKullananlar.map((model: AracKullanan) => ({
			label: `${model.ad} ${model.soyad}`,
			value: model.id,
		}));
	}, [aracKullananlar]);

	const isMusteriSelectDisabled =
		!odeyenFirmaId ||
		isAracKullananlarLoading ||
		isAracKullananlarFetching ||
		aracKullananlarOptions.length === 0;

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

					<form.AppField
						name="odeyenFirmaId"
						listeners={{
							onChange: ({ value }) => {
								form.setFieldValue("odeyenFirmaId", value);
								form.setFieldValue("musteriId", "");
								if (value) refetchAracKullananlar();
							},
						}}
					>
						{(field) => (
							<field.Select label="Ödeyen Firma" values={firmalarOptions} />
						)}
					</form.AppField>

					<form.AppField
						name="musteriId"
						validators={{
							onChangeListenTo: ["odeyenFirmaId"],
						}}
					>
						{(field) => (
							<field.Select
								label="Müşteri"
								values={aracKullananlarOptions}
								placeholder="Müşteri Seçiniz"
								disabled={isMusteriSelectDisabled}
							/>
						)}
					</form.AppField>

					<form.AppField name="kazaTarihi">
						{(field) => <field.DatePicker label="Kaza Tarihi" />}
					</form.AppField>

					<form.AppField name="kazaIli">
						{(field) => <field.TextField label="Kaza İli" />}
					</form.AppField>

					<form.AppField name="kazaNedeni">
						{(field) => <field.TextField label="Kaza Nedeni" />}
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
