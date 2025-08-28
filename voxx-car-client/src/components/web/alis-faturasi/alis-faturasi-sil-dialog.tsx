import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteAlisFaturasiMutation } from "@/hooks/use-alis-faturasi-hooks";
import type { AlisFaturasi } from "@/schemas/alis-faturasi";
import { RefreshCw } from "lucide-react";

interface AlisFaturasiDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedAlisFaturasi: AlisFaturasi;
}

export default function AlisFaturasiSilDialog({
	open,
	close,
	selectedAlisFaturasi,
}: AlisFaturasiDialogDeleteProps) {
	const deleteAlisFaturasiMutation = useDeleteAlisFaturasiMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Alış faturasını Sil</DialogTitle>
					<DialogDescription>
						Seçili alış faturası <i>{selectedAlisFaturasi.alisFaturaNo}</i>{" "}
						silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							deleteAlisFaturasiMutation.mutateAsync(selectedAlisFaturasi.id)
						}
						disabled={deleteAlisFaturasiMutation.isPending}
					>
						{deleteAlisFaturasiMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
