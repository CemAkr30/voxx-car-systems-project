import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteAracKiralaMutation } from "@/hooks/use-arac-kirala-hooks";
import type { AracKirala } from "@/schemas/arac-kirala";
import { RefreshCw } from "lucide-react";

interface AracKiralaSilDialogProps {
	open: boolean;
	close: () => void;
	selectedAracKirala: AracKirala;
}

export default function AracKiralaSilDialog({
	open,
	close,
	selectedAracKirala,
}: AracKiralaSilDialogProps) {
	const deleteAracKiralaMutation = useDeleteAracKiralaMutation(
		selectedAracKirala.firmaId,
		close,
	);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Kiralama Kaydını Sil</DialogTitle>
					<DialogDescription>
						Seçili kiralama kaydını silmek istediğinizden emin misiniz? 
						Bu işlem geri alınamaz ve kiralama bilgileri kalıcı olarak silinecektir.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							deleteAracKiralaMutation.mutateAsync(selectedAracKirala.id)
						}
						disabled={deleteAracKiralaMutation.isPending}
					>
						{deleteAracKiralaMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}