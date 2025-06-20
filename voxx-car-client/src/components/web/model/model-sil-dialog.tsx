import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteModelMutation } from "@/hooks/use-model-hooks";
import type { Model } from "@/schemas/model";
import { RefreshCw } from "lucide-react";

interface ModelDialogDeleteProps {
  open: boolean;
  close: () => void;
  selectedModel: Model;
}

export default function ModelSilDialog({
  open,
  close,
  selectedModel,
}: ModelDialogDeleteProps) {
  const deleteModelMutation = useDeleteModelMutation(close);

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seçili Modeli Sil</DialogTitle>
          <DialogDescription>
            {selectedModel.adi} modeli silmek istediğinizden emin misiniz? Bu
            işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteModelMutation.mutateAsync(selectedModel.id)}
            disabled={deleteModelMutation.isPending}
          >
            {deleteModelMutation.isPending ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            Tümünü Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
