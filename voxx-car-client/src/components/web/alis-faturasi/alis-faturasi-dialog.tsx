import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {ParaBirimiTipiListesi, ParaBirimiTipiListesiLabel} from "@/enums";
import {useAppForm} from "@/hooks/demo.form";
import {
    getAlisFaturasiByAracFiloIdQueryOptions,
    useCreateAlisFaturasiMutation,
    useUpdateAlisFaturasiMutation,
} from "@/hooks/use-alis-faturasi-hooks";
import {type AlisFaturasi, alisFaturasiCreateSchema, type CreateAlisFaturasiRequest} from "@/schemas/alis-faturasi";
import {useQueryClient} from "@tanstack/react-query";
import {RefreshCw} from "lucide-react";
import type {Firma} from "@/schemas/firma.ts";
import {useMemo} from "react";

interface AlisFaturasiDialogCreateProps {
    mode: "create";
    open: boolean;
    close: () => void;
    aracFiloId: string;
    firmalar: Firma[];
    initialValues: { aracFiloId: string };
}

interface AlisFaturasiDialogUpdateProps {
    mode: "update";
    open: boolean;
    close: () => void;
    aracFiloId: string;
    firmalar: Firma[];
    initialValues: AlisFaturasi;
}

type AlisFaturasiDialogProps = AlisFaturasiDialogCreateProps | AlisFaturasiDialogUpdateProps;

export default function AlisFaturasiDialog(props: AlisFaturasiDialogProps) {
    const {mode, open, close, initialValues, firmalar, aracFiloId} = props;
    const queryClient = useQueryClient();

    const paraBirimiTipiOptions = ParaBirimiTipiListesi.map((paraBirimi) => ({
        label: ParaBirimiTipiListesiLabel[paraBirimi],
        value: paraBirimi,
    }));

    const firmalarOptions = useMemo(
        () =>
            firmalar.map((firma: Firma) => ({
                label: firma.unvan,
                value: firma.id,
            })),
        [firmalar],
    );

    const createAlisFaturasiMutation = useCreateAlisFaturasiMutation(close);
    const updateAlisFaturasiMutation =
        mode === "create" ? null : useUpdateAlisFaturasiMutation(close);

    const form = useAppForm({
        defaultValues:
            mode === "create"
                ? {
                    aracFiloId,
                    alisFaturasiTarihi: new Date(),
                    alisFaturaNo: "",
                    saticiFirmaId: "",
                    listeFiyati: 0,
                    ekGaranti: 0,
                    malDegeri: 0,
                    iskonto: 0,
                    nakliyeBedeli: 0,
                    otvMatrah: 0,
                    otv: 0,
                    otvIndirimi: 0,
                    kdv: 0,
                    faturaToplam: 0,
                    paraBirimi: ParaBirimiTipiListesi[0],
                    gecikmeCezasi: "",
                    kur: 0,
                    faturaTry: 0,
                    faturaYukle: "",
                    aciklama: "",

                }
                : {
                    ...props.initialValues,
                },
        validators: {
            // @ts-expect-error
            onChange: mode === "create" ? alisFaturasiCreateSchema : bakimUpdateSchema,
        },
        onSubmit: async ({formApi, value}) => {
            try {
                if (mode === "create") {
                    await createAlisFaturasiMutation.mutateAsync(
                        value as CreateAlisFaturasiRequest,
                    );
                } else if (mode === "update") {
                    await updateAlisFaturasiMutation!.mutateAsync(value as AlisFaturasi);
                }
                formApi.reset();
                queryClient.invalidateQueries(
                    getAlisFaturasiByAracFiloIdQueryOptions(initialValues.aracFiloId),
                );
            } catch (_error) {
            }
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
                            ? "Yeni Alış faturası Ekle"
                            : "Seçili Alış faturasını Güncelle"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Yeni alış faturası eklemek için formu eksiksiz doldurunuz"
                            : "Seçili Alış faturasını Güncelle"}
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
                    <form.AppField name="alisFaturasiTarihi">
                        {(field) => <field.TextField label="Alış faturası tarihi"/>}

                    </form.AppField>

                    <form.AppField name="alisFaturaNo">
                        {(field) => <field.TextField label="Alış faturası numarası"/>}
                    </form.AppField>

                    <form.AppField name="saticiFirmaId">
                        {(field) => (
                            <field.Select
                                label="Satıcı Firma"
                                values={firmalarOptions}
                            />
                        )}
                    </form.AppField>

                    <form.AppField name="listeFiyati">
                        {(field) => <field.TextField label="liste Fiyatı"/>}
                    </form.AppField>

                    <form.AppField name="ekGaranti">
                        {(field) => <field.TextField label="Ek Garanti"/>}
                    </form.AppField>

                    <form.AppField name="malDegeri">
                        {(field) => <field.TextField label="Mal değeri"/>}
                    </form.AppField>

                    <form.AppField name="iskonto">
                        {(field) => <field.TextField label="İskonto"/>}
                    </form.AppField>

                    <form.AppField name="nakliyeBedeli">
                        {(field) => <field.TextField label="Nakliye bedeli"/>}
                    </form.AppField>

                    <form.AppField name="otvMatrah">
                        {(field) => <field.TextField label="OTV matrahı"/>}
                    </form.AppField>

                    <form.AppField name="otv">
                        {(field) => <field.TextField label="OTV"/>}
                    </form.AppField>

                    <form.AppField name="otvIndirimi">
                        {(field) => <field.TextField label="OTV indirimi"/>}
                    </form.AppField>

                    <form.AppField name="kdv">
                        {(field) => <field.TextField label="KDV"/>}
                    </form.AppField>

                    <form.AppField name="faturaToplam">
                        {(field) => <field.TextField label="Fatura toplam"/>}
                    </form.AppField>

                    <form.AppField name="paraBirimi">
                        {(field) => (
                            <field.Select label="Para birimi" values={paraBirimiTipiOptions}/>
                        )}
                    </form.AppField>

                    <form.AppField name="gecikmeCezasi">
                        {(field) => <field.TextField label="Gecikme cezası"/>}
                    </form.AppField>

                    <form.AppField name="kur">
                        {(field) => <field.TextField label="Kur"/>}
                    </form.AppField>

                    <form.AppField name="faturaTry">
                        {(field) => <field.TextField label="Fatura TRY"/>}
                    </form.AppField>

                    <form.AppField name="faturaYukle">
                        {(field) => <field.TextField label="Fatura"/>}
                    </form.AppField>

                    <form.AppField name="aciklama">
                        {(field) => <field.TextField label="Açıklama"/>}
                    </form.AppField>


                    <DialogFooter>
                        <Button variant="outline" onClick={close}>
                            İptal
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                mode === "create"
                                    ? createAlisFaturasiMutation.isPending
                                    : updateAlisFaturasiMutation!.isPending
                            }
                        >
                            {mode === "create" ? (
                                createAlisFaturasiMutation.isPending
                            ) : updateAlisFaturasiMutation!.isPending ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                            ) : null}
                            {mode === "create"
                                ? "Yeni Alış faturası Ekle"
                                : "Seçili Alış faturasını Güncelle"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
