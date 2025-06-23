import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteAdresMutation } from "@/hooks/use-adres-hooks";
import type { Adres } from "@/schemas/adres";
import { RefreshCw } from "lucide-react";

interface AdresDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedAdres: Adres;
}

export default function AdresSilDialog({
	open,
	close,
	selectedAdres,
}: AdresDialogDeleteProps) {
	const deleteAdresMutation = useDeleteAdresMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Adresi Sil</DialogTitle>
					<DialogDescription>
						Seçili adres <i>{selectedAdres.aciklama}</i> silmek istediğinizden
						emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteAdresMutation.mutateAsync(selectedAdres.id)}
						disabled={deleteAdresMutation.isPending}
					>
						{deleteAdresMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
