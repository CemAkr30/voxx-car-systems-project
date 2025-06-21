import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteAracKullananMutation } from "@/hooks/use-arac-kullanan-hooks";
import type { AracKullanan } from "@/schemas/arac-kullanan";
import { RefreshCw } from "lucide-react";

interface AracKullananDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedAracKullanan: AracKullanan;
}

export default function AracKullananSilDialog({
	open,
	close,
	selectedAracKullanan,
}: AracKullananDialogDeleteProps) {
	const deleteAracKullananMutation = useDeleteAracKullananMutation(selectedAracKullanan.firmaId, close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Seçili AracKullananyı Sil</DialogTitle>
					<DialogDescription>
						{`${selectedAracKullanan.ad} ${selectedAracKullanan.soyad}`} araç
						kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri
						alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							deleteAracKullananMutation.mutateAsync(selectedAracKullanan.id)
						}
						disabled={deleteAracKullananMutation.isPending}
					>
						{deleteAracKullananMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Tümünü Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
