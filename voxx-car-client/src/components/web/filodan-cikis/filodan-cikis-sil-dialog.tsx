import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteFilodanCikisMutation } from "@/hooks/use-filodan-cikis-hooks";
import type { FilodanCikis } from "@/schemas/filodan-cikis";
import { RefreshCw } from "lucide-react";

interface FilodanCikisDialogDeleteProps {
	open: boolean;
	close: () => void;
	selectedFilodanCikis: FilodanCikis;
}

export default function FilodanCikisSilDialog({
	open,
	close,
	selectedFilodanCikis,
}: FilodanCikisDialogDeleteProps) {
	const deleteFilodanCikisMutation = useDeleteFilodanCikisMutation(close);

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Seçili Bakımı Sil</DialogTitle>
					<DialogDescription>
						Seçili bakım <i>{selectedFilodanCikis.alici}</i> silmek
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
							deleteFilodanCikisMutation.mutateAsync(selectedFilodanCikis.id)
						}
						disabled={deleteFilodanCikisMutation.isPending}
					>
						{deleteFilodanCikisMutation.isPending ? (
							<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
						) : null}
						Sil
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
