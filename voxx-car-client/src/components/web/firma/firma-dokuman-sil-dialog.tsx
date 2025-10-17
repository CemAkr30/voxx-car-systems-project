import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useFirmaDokumanSilMutation } from "@/hooks/use-firma-hooks";
import type { FirmaDokuman } from "@/schemas/firma";
import { RefreshCw } from "lucide-react";

interface FirmaDokumanSilDialogProps {
	open: boolean;
	close: () => void;
	selectedDokuman: FirmaDokuman;
	firmaId: string;
}

export default function FirmaDokumanSilDialog({
	open,
	close,
	selectedDokuman,
	firmaId,
}: FirmaDokumanSilDialogProps) {
	const deleteDokumanMutation = useFirmaDokumanSilMutation(firmaId, close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>Seçili Dokümanı Sil</DialogTitle>
					<DialogDescription>
						Bu dokümanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={close}>
						İptal
					</Button>
					<Button
						variant="destructive"
						onClick={() => deleteDokumanMutation.mutateAsync(selectedDokuman.id)}
						disabled={deleteDokumanMutation.isPending}
					>
						{deleteDokumanMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
