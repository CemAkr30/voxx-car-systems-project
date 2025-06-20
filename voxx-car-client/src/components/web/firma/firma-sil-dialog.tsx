import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type {Firma} from "@/schemas/firma";
import {RefreshCw} from "lucide-react";
import {useDeleteFirmaMutation} from "@/hooks/use-firma-hooks.ts";

interface FirmaDialogDeleteProps {
    open: boolean;
    close: () => void;
    selectedFirma: Firma;
}

export default function FirmaSilDialog({
                                           open,
                                           close,
                                           selectedFirma,
                                       }: FirmaDialogDeleteProps) {
    const deleteFirmaMutation = useDeleteFirmaMutation(close);

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Seçili Firmayı Sil</DialogTitle>
                    <DialogDescription>
                        {selectedFirma.unvan} firmayı silmek istediğinizden emin misiniz? Bu
                        işlem geri alınamaz.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={close}>
                        İptal
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => deleteFirmaMutation.mutateAsync(selectedFirma.id)}
                        disabled={deleteFirmaMutation.isPending}
                    >
                        {deleteFirmaMutation.isPending ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                        ) : null}
                        Tümünü Sil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
