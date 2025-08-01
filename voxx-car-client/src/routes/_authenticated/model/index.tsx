import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, RefreshCw, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { getModellerQueryOptions } from "@/hooks/use-model-hooks";
import type { Model } from "@/schemas/model";
import ModelDialog from "@/components/web/model/model-dialog";
import ModelSilDialog from "@/components/web/model/model-sil-dialog";
import { getMarkalarQueryOptions } from "@/hooks/use-marka-hooks";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useWebSocketTopic } from "@/hooks/use-webhook";
import type { WebSocketMessage } from "@/types";
import { toast } from "sonner";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedModel?: Model;
}

export const Route = createFileRoute("/_authenticated/model/")({
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData(getMarkalarQueryOptions());
		queryClient.ensureQueryData(getModellerQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();

	useWebSocketTopic<WebSocketMessage>({
		topic: "/topic/model",
		onMessage: async ({ type }) => {
			if (type === "CREATED") {
				toast.success("Model başarılı bir şekilde kayıt edildi");
			}
			if (type === "UPDATED") {
				toast.success("Model başarılı bir şekilde güncellendi");
			}
			if (type === "DELETED") {
				toast.success("Model başarılı bir şekilde silindi");
			}
			await queryClient.invalidateQueries({ queryKey: ["modeller"] });
		},
	});

	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});
	const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

	const { data: modeller = [] } = useSuspenseQuery(getModellerQueryOptions());
	const { data: markalar = [] } = useSuspenseQuery(getMarkalarQueryOptions());

	const openDialog = (type: keyof DialogState, model?: Model) => {
		setDialogState({
			create: type === "create",
			update: type === "update",
			delete: type === "delete",
			selectedModel: model,
		});
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
		// Clear selected items when closing delete dialog
		if (dialogState.delete) {
			setSelectedItems([]);
		}
		// Close all dropdowns after dialog operations
		setOpenDropdowns(new Set());
	};

	const handleDropdownOpenChange = (modelId: string, open: boolean) => {
		setOpenDropdowns((prev) => {
			const newSet = new Set(prev);
			if (open) {
				newSet.add(modelId);
			} else {
				newSet.delete(modelId);
			}
			return newSet;
		});
	};

	const handleBulkDelete = () => {
		setDialogState({
			create: false,
			update: false,
			delete: true,
			selectedModel: undefined,
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Model Yönetimi</h1>
				<p className="text-gray-600 mt-2">Araç modellerinizi yönetin</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Model Listesi</CardTitle>
						<div className="flex items-center space-x-2">
							<Button onClick={() => openDialog("create")}>
								Yeni Model Ekle
							</Button>
							{/* <DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										<Download className="h-4 w-4 mr-2" />
										Dışa Aktar
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
								</DropdownMenuContent>
							</DropdownMenu> */}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{/* Filters and Search */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<Input
									placeholder="Model ara..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 w-64"
								/>
							</div>
							<Button variant="outline" size="sm">
								<Filter className="h-4 w-4 mr-2" />
								Filtreler
							</Button>
							<Button variant="outline" size="sm">
								<RefreshCw className="h-4 w-4 mr-2" />
								Yenile
							</Button>
						</div>

						{selectedItems.length > 0 && (
							<div className="flex items-center space-x-2">
								<Badge variant="secondary">
									{selectedItems.length} öğe seçili
								</Badge>
								<Button
									variant="destructive"
									size="sm"
									onClick={handleBulkDelete}
								>
									Seçilenleri Sil
								</Button>
							</div>
						)}
					</div>

					{/* Table */}
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Marka</TableHead>
									<TableHead>Model Adı</TableHead>
									<TableHead>Oluşturulma Tarihi</TableHead>
									<TableHead>Güncellenme Tarihi</TableHead>
									<TableHead className="w-12">İşlemler</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{modeller.map((model: Model) => (
									<TableRow key={model.id}>
										<TableCell>
											{
												markalar.find((marka) => model.markaId === marka.id)
													?.adi
											}
										</TableCell>
										<TableCell className="font-medium">{model.adi}</TableCell>
										<TableCell>{formatDate(model.createdAt)}</TableCell>
										<TableCell>{formatDate(model.updatedAt)}</TableCell>
										<TableCell>
											<DropdownMenu
												open={openDropdowns.has(model.id)}
												onOpenChange={(open) =>
													handleDropdownOpenChange(model.id, open)
												}
											>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent className="flex flex-col gap-1 p-1">
													<Button
														variant="ghost"
														size="sm"
														className="justify-start"
														onClick={() => openDialog("update", model)}
													>
														Düzenle
													</Button>
													<Button
														variant="ghost"
														size="sm"
														className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => openDialog("delete", model)}
													>
														Sil
													</Button>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Dialogs */}
			{dialogState.create && (
				<ModelDialog
					mode="create"
					open={dialogState.create}
					close={closeDialog}
					markalar={markalar}
				/>
			)}

			{dialogState.update && dialogState.selectedModel && (
				<ModelDialog
					mode="update"
					open={dialogState.update}
					close={closeDialog}
					markalar={markalar}
					initialValues={dialogState.selectedModel}
				/>
			)}

			{dialogState.delete && dialogState.selectedModel && (
				<ModelSilDialog
					open={dialogState.delete}
					close={closeDialog}
					selectedModel={dialogState.selectedModel!}
				/>
			)}
		</div>
	);
}
