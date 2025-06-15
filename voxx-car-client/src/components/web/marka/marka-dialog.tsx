import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppForm } from "@/hooks/demo.form";
import {
  useCreateMarkaMutation,
  useUpdateMarkaMutation,
} from "@/hooks/use-marka-hooks";
import {
  markaCreateSchema,
  markaUpdateSchema,
  type CreateMarkaRequest,
  type Marka,
} from "@/schemas/marka";

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
        } else if (mode === "update") {
          await updateMarkaMutation!.mutateAsync(value as Marka);
        }
        formApi.reset();
      } catch (error) {}
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
            {mode === "create" ? "Yeni Marka Ekle" : "Markayı Güncelle"}
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
          <form.AppField name="adi">
            {(field) => <field.TextField label="Marka Adı" />}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
