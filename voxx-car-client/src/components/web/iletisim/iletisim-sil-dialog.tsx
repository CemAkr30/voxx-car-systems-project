import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteIletisimMutation } from "@/hooks/use-iletisim-hooks";
import type { Iletisim } from "@/schemas/iletisim";
import { RefreshCw } from "lucide-react";

interface IletisimDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedIletisim: Iletisim;
}

export default function IletisimSilDialog({
	open,
	close,
	selectedIletisim,
}: IletisimDialogDeleteProps) {
	const deleteIletisimMutation = useDeleteIletisimMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Iletisimi Sil</DialogTitle>
					<DialogDescription>
						Seçili iletisim <i>{selectedIletisim.numara}</i> silmek
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
							deleteIletisimMutation.mutateAsync(selectedIletisim.id)
						}
						disabled={deleteIletisimMutation.isPending}
					>
						{deleteIletisimMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
