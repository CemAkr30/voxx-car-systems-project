import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteMarkaMutation } from "@/hooks/use-marka-hooks";
import type { Marka } from "@/schemas/marka";
import { RefreshCw } from "lucide-react";

interface MarkaDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedMarka: Marka;
}

export default function MarkaSilDialog({
	open,
	close,
	selectedMarka,
}: MarkaDialogDeleteProps) {
	const deleteMarkaMutation = useDeleteMarkaMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Markayı Sil</DialogTitle>
					<DialogDescription>
						Seçili marka <i>{selectedMarka.adi}</i> silmek istediğinizden emin
						misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteMarkaMutation.mutateAsync(selectedMarka.id)}
						disabled={deleteMarkaMutation.isPending}
					>
						{deleteMarkaMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
