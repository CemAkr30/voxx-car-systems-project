import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteMtvMutation } from "@/hooks/use-mtv-hooks";
import type { Mtv } from "@/schemas/mtv";
import { RefreshCw } from "lucide-react";

interface MtvDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedMtv: Mtv;
}

export default function MtvSilDialog({
	open,
	close,
	selectedMtv,
}: MtvDialogDeleteProps) {
	const deleteMtvMutation = useDeleteMtvMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Mtvyı Sil</DialogTitle>
					<DialogDescription>
						Seçili mtv <i>{selectedMtv.makbuzNo}</i> silmek istediğinizden emin
						misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteMtvMutation.mutateAsync(selectedMtv.id)}
						disabled={deleteMtvMutation.isPending}
					>
						{deleteMtvMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
