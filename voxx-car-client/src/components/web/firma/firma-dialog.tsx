import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {useAppForm} from "@/hooks/demo.form";
import {useCreateFirmaMutation, useUpdateFirmaMutation,} from "@/hooks/use-firma-hooks.ts";
import {type CreateFirmaRequest, type Firma, firmaCreateSchema, firmaUpdateSchema,} from "@/schemas/firma";

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
    const {mode, open, close} = props;

    const createFirmaMutation = useCreateFirmaMutation(close);
    const updateFirmaMutation =
        mode === "create" ? null : useUpdateFirmaMutation(close);

    const form = useAppForm({
        defaultValues:
            mode === "create"
                ? {
                    unvan: "",
                    email: "",
                    vergiNo: "",
                }
                : props.initialValues,
        validators: {
            onChange: mode === "create" ? firmaCreateSchema : firmaUpdateSchema,
        },
        onSubmit: async ({formApi, value}) => {
            try {
                if (mode === "create") {
                    await createFirmaMutation.mutateAsync(value as CreateFirmaRequest);
                } else if (mode === "update") {
                    await updateFirmaMutation!.mutateAsync(value as Firma);
                }
                formApi.reset();
            } catch (error) {
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Yeni Firma Ekle" : "Firmayı Güncelle"}
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
                    <form.AppField name="unvan">
                        {(field) => <field.TextField label="Firma unvan"/>}
                    </form.AppField>

                    <form.AppField name="email">
                        {(field) => <field.TextField label="Firma email"/>}
                    </form.AppField>

                    <form.AppField name="vergiNo">
                        {(field) => <field.TextField label="Firma vergiNo"/>}
                    </form.AppField>

                    <div className="flex justify-end">
                        <form.AppForm>
                            <form.SubscribeButton
                                label={
                                    mode === "create" ? "Yeni Firma Ekle" : "Firmayı Güncelle"
                                }
                            />
                        </form.AppForm>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
