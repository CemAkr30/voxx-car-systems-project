import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteKazaMutation } from "@/hooks/use-kaza-hooks";
import type { Kaza } from "@/schemas/kaza";
import { RefreshCw } from "lucide-react";

interface KazaDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedKaza: Kaza;
}

export default function KazaSilDialog({
	open,
	close,
	selectedKaza,
}: KazaDialogDeleteProps) {
	const deleteKazaMutation = useDeleteKazaMutation(
		selectedKaza.aracFiloId,
		close,
	);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
				<DialogTitle>Seçili Kazayı Sil</DialogTitle>
				<DialogDescription>
					Seçili kaza <i>{selectedKaza.kazaNedeni}</i> silmek istediğinizden
					emin misiniz? Bu işlem geri alınamaz.
				</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteKazaMutation.mutateAsync(selectedKaza.id)}
						disabled={deleteKazaMutation.isPending}
					>
						{deleteKazaMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
