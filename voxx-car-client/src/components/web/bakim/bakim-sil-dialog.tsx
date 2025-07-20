import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteBakimMutation } from "@/hooks/use-bakim-hooks";
import type { Bakim } from "@/schemas/bakim";
import { RefreshCw } from "lucide-react";

interface BakimDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedBakim: Bakim;
}

export default function BakimSilDialog({
	open,
	close,
	selectedBakim,
}: BakimDialogDeleteProps) {
	const deleteBakimMutation = useDeleteBakimMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Bakımı Sil</DialogTitle>
					<DialogDescription>
						Seçili bakım <i>{selectedBakim.fatura}</i> silmek istediğinizden
						emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteBakimMutation.mutateAsync(selectedBakim.id)}
						disabled={deleteBakimMutation.isPending}
					>
						{deleteBakimMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
