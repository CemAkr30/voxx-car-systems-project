import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteAracFiloMutation } from "@/hooks/use-arac-filo-hooks";
import type { AracFilo } from "@/schemas/arac-filo";
import { RefreshCw } from "lucide-react";

interface AracFiloDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedAracFilo: AracFilo;
}

export default function AracFiloSilDialog({
	open,
	close,
	selectedAracFilo,
}: AracFiloDialogDeleteProps) {
	const deleteAracFiloMutation = useDeleteAracFiloMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili AracFiloyı Sil</DialogTitle>
					<DialogDescription>
						<i>{selectedAracFilo.aracTipi}</i> aracFiloyı silmek istediğinizden
						emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							deleteAracFiloMutation.mutateAsync(selectedAracFilo.id)
						}
						disabled={deleteAracFiloMutation.isPending}
					>
						{deleteAracFiloMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
