import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {getAlisFaturasiByAracFiloIdQueryOptions} from "@/hooks/use-alis-faturasi-hooks";
import type {AlisFaturasi} from "@/schemas/alis-faturasi";
import {useSuspenseQueries} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {Edit, MapPin, Plus, Trash2} from "lucide-react";
import {useState} from "react";
import AlisFaturasiDialog from "@/components/web/alis-faturasi/alis-faturasi-dialog.tsx";
import AlisFaturasiSilDialog from "@/components/web/alis-faturasi/alis-faturasi-sil-dialog.tsx";
import {getFirmalarQueryOptions} from "@/hooks/use-firma-hooks.ts";

export const Route = createFileRoute(
    "/_authenticated/arac-filo/$aracFiloId/_layout/alis-faturasi/",
)({
    loader: ({context: {queryClient}, params: {aracFiloId}}) => {
        queryClient.ensureQueryData(
            getAlisFaturasiByAracFiloIdQueryOptions(aracFiloId),
        );
    },
    component: RouteComponent,
});

interface DialogState {
    create: boolean;
    update: boolean;
    delete: boolean;
    selectedAlisFaturasi?: AlisFaturasi;
}

function RouteComponent() {
    const {aracFiloId} = Route.useParams();
    const [dialogState, setDialogState] = useState<DialogState>({
        create: false,
        update: false,
        delete: false,
    });

    const [{data: alisFaturasi = []}, {data: firmalar}] = useSuspenseQueries({
        queries: [
            getAlisFaturasiByAracFiloIdQueryOptions(aracFiloId),
            getFirmalarQueryOptions(),
        ],
    });

    const openDialog = (type: keyof DialogState, alisFaturasi?: AlisFaturasi) => {
        setDialogState({
            create: type === "create",
            update: type === "update",
            delete: type === "delete",
            selectedAlisFaturasi: alisFaturasi,
        });
    };

    const closeDialog = () => {
        setDialogState({
            create: false,
            update: false,
            delete: false,
        });
    };

    return (
        <div className="space-y-8">
            <div
                className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-black/10"/>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"/>
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"/>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"/>
                <div className="relative p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"/>
                                <div
                                    className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                                    <MapPin className="h-7 w-7 text-white"/>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Alış Faturaları
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => openDialog("create")}
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 rounded-xl text-indigo-600 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Plus className="h-4 w-4"/>
                                Yeni Alış Faturası
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Alış faturaları Listesi
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Tüm alış faturalarını görüntüleyin ve yönetin
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow
                                className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20">
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Alış faturası tarihi
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Alış faturası numarası
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Satıcı Firma
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Liste Fiyatı
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Ek garanti
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Mal değeri
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    İskonto
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Nakliye bedeli
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    OTV matrahı
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    OTV
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    OTV indirimi
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    KDV
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Fatura toplamı
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Para birimi
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Gecikme cezası
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Kur
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Fatura try
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Fatura yukle
                                </TableHead>
                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                                    Açıklama
                                </TableHead>

                                <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">
                                    İşlemler
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alisFaturasi.map((alisFaturasi) => {
                                return (
                                    <TableRow
                                        key={alisFaturasi.id}
                                        className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/10 dark:hover:to-purple-950/10 transition-all duration-200"
                                    >
                                        <TableCell>
                                            <div className="max-w-xs">
                                                <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                                    {new Date(alisFaturasi.alisFaturasiTarihi).toLocaleDateString("tr-TR")}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-xs">
                                                <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                                    {alisFaturasi.alisFaturaNo}
                                                </p>
                                            </div>
                                        </TableCell>

                                        <TableCell>
											<span
                                                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono text-slate-700 dark:text-slate-300">
												{alisFaturasi.saticiFirmaId}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.listeFiyati}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.ekGaranti}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.malDegeri}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.iskonto}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.nakliyeBedeli}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.otvMatrah}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.otv}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.otvIndirimi}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.kdv}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.faturaToplam}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.paraBirimi}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.gecikmeCezasi}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.kur}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.faturaTry}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.faturaYukle}
											</span>
                                        </TableCell>
                                        <TableCell>
											<span className="text-slate-600 dark:text-slate-400 font-mono text-sm">
												{alisFaturasi.aciklama}
											</span>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    onClick={() => openDialog("update", alisFaturasi)}
                                                    variant="ghost"
                                                    type="button"
                                                    className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors group"
                                                >
                                                    <Edit
                                                        className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"/>
                                                </Button>
                                                <Button
                                                    onClick={() => openDialog("delete", alisFaturasi)}
                                                    variant="ghost"
                                                    type="button"
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
                                                >
                                                    <Trash2
                                                        className="h-4 w-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Table Footer */}
                <div
                    className="p-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/10 dark:to-purple-950/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
							<span className="text-sm text-slate-600 dark:text-slate-400">
								Toplam {alisFaturasi.length} alış faturaları gösteriliyor
							</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                type="button"
                                className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Önceki
                            </Button>
                            <span
                                className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded-md">
								1
							</span>
                            <Button
                                variant="ghost"
                                type="button"
                                className="px-3 py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Sonraki
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            {dialogState.create && (
                <AlisFaturasiDialog
                    aracFiloId={aracFiloId}
                    mode="create"
                    open={dialogState.create}
                    close={closeDialog}
                    initialValues={{aracFiloId}}
                    firmalar={firmalar}
                />
            )}

            {dialogState.update && dialogState.selectedAlisFaturasi && (
                <AlisFaturasiDialog
                    aracFiloId={aracFiloId}
                    mode="update"
                    open={dialogState.update}
                    close={closeDialog}
                    initialValues={dialogState.selectedAlisFaturasi}
                    firmalar={firmalar}
                />
            )}

            {dialogState.delete && (
                <AlisFaturasiSilDialog
                    open={dialogState.delete}
                    close={closeDialog}
                    selectedAlisFaturasi={dialogState.selectedAlisFaturasi!}
                />
            )}
        </div>
    );
}
