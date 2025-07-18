import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteMuayeneMutation } from "@/hooks/use-muayene-hooks";
import type { Muayene } from "@/schemas/muayene";
import { RefreshCw } from "lucide-react";

interface MuayeneDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedMuayene: Muayene;
}

export default function MuayeneSilDialog({
	open,
	close,
	selectedMuayene,
}: MuayeneDialogDeleteProps) {
	const deleteMuayeneMutation = useDeleteMuayeneMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Muayeneyi Sil</DialogTitle>
					<DialogDescription>
						Seçili muayene <i>{selectedMuayene.makbuzNo}</i> silmek
						istediğinizden emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							deleteMuayeneMutation.mutateAsync(selectedMuayene.id)
						}
						disabled={deleteMuayeneMutation.isPending}
					>
						{deleteMuayeneMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
