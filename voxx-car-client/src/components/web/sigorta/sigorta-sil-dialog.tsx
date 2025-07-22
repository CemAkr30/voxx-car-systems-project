import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteSigortaMutation } from "@/hooks/use-sigorta-hooks";
import type { Sigorta } from "@/schemas/sigorta";
import { RefreshCw } from "lucide-react";

interface SigortaDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedSigorta: Sigorta;
}

export default function SigortaSilDialog({
	open,
	close,
	selectedSigorta,
}: SigortaDialogDeleteProps) {
	const deleteSigortaMutation = useDeleteSigortaMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Sigortayı Sil</DialogTitle>
					<DialogDescription>
						Seçili sigorta <i>{selectedSigorta.policeNo}</i> silmek
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
							deleteSigortaMutation.mutateAsync(selectedSigorta.id)
						}
						disabled={deleteSigortaMutation.isPending}
					>
						{deleteSigortaMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
