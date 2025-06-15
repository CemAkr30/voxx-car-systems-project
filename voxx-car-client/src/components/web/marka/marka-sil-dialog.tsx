import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteMarkaMutation } from "@/hooks/use-marka-hooks";
import { RefreshCw } from "lucide-react";

interface MarkaDialogDeleteProps {
  open: boolean;
  close: () => void;
  selectedMarkalar: number[];
}

export default function MarkaSilDialog({
  open,
  close,
  selectedMarkalar,
}: MarkaDialogDeleteProps) {
  const deleteMarkaMutation = useDeleteMarkaMutation(close);

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Seçili Markaları Sil</DialogTitle>
          <DialogDescription>
            {selectedMarkalar.length} markayı silmek istediğinizden emin
            misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            İptal
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteMarkaMutation.mutateAsync(selectedMarkalar)}
            disabled={deleteMarkaMutation.isPending}
          >
            {deleteMarkaMutation.isPending ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            Tümünü Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
