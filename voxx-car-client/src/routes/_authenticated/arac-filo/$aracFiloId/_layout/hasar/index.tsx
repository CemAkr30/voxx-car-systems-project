import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import HasarDialog from "@/components/web/hasar/hasar-dialog";
import {
	HasarliParcaListesi,
	HasarliParcaListesiLabel,
	HasarTipiListesi,
	HasarTipiListesiLabel,
	type HasarliParca,
} from "@/enums";
import {
	getHasarlarByAracFiloIdQueryOptions,
	useCreateHasarMutation,
	useDeleteHasarMutation,
	useUpdateHasarMutation,
} from "@/hooks/use-hasar-hooks";
import { cn, isUUID } from "@/lib/utils";
import type { Hasar } from "@/schemas/hasar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useBlocker } from "@tanstack/react-router";
import { AlertTriangle, Car, Edit, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DialogState {
	create: boolean;
	update: boolean;
	delete: boolean;
	selectedHasar?: Hasar;
}

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/hasar/",
)({
	loader: ({ context: { queryClient }, params: { aracFiloId } }) => {
		queryClient.ensureQueryData(
			getHasarlarByAracFiloIdQueryOptions(aracFiloId),
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { aracFiloId } = Route.useParams();
	const createHasarMutation = useCreateHasarMutation();
	const updateHasarMutation = useUpdateHasarMutation();
	const deleteHasarMutation = useDeleteHasarMutation();
	const { data: hasarlar } = useSuspenseQuery(
		getHasarlarByAracFiloIdQueryOptions(aracFiloId),
	);
	const [selectedPart, setSelectedPart] = useState<HasarliParca | null>(null);
	const [selectedParts, setSelectedParts] = useState<Hasar[]>(hasarlar);
	const [updatedParts, setUpdatedParts] = useState<string[]>([]);
	const [deletedParts, setDeletedParts] = useState<string[]>([]);
	const [dialogState, setDialogState] = useState<DialogState>({
		create: false,
		update: false,
		delete: false,
	});

	const selectedPartTip = (parca: HasarliParca) => {
		const part = selectedParts.find((p) => p.hasarliParca === parca);
		return part?.hasarTipi ?? "NotSet";
	};

	const closeDialog = () => {
		setDialogState({
			create: false,
			update: false,
			delete: false,
		});
		setSelectedPart(null);
	};

	const fillColors = {
		[HasarTipiListesi[0]]: "fill-[#6ce700]",
		[HasarTipiListesi[1]]: "fill-[url(#Gradient_local)]",
		[HasarTipiListesi[2]]: "fill-[#ffe94d]",
		[HasarTipiListesi[3]]: "fill-[#e40030]",
		[HasarTipiListesi[4]]: "fill-[#e0e0e0]",
	};

	const getFillColorClass = (parca: HasarliParca): string => {
		const tip = selectedPartTip(parca);
		return fillColors[tip] ?? "";
	};

	useEffect(() => {
		if (!selectedPart) return;

		if (selectedParts.find((part) => part.hasarliParca === selectedPart)) {
			setDialogState((prevState) => ({ ...prevState, update: true }));
		} else {
			setDialogState((prevState) => ({ ...prevState, create: true }));
		}
	}, [selectedParts, selectedPart]);

	const { proceed, reset, status } = useBlocker({
		shouldBlockFn: () =>
			selectedParts.some((part) => !isUUID(part.id)) ||
			updatedParts.length > 0 ||
			deletedParts.length > 0,
		withResolver: true,
		enableBeforeUnload:
			selectedParts.some((part) => !isUUID(part.id)) ||
			updatedParts.length > 0 ||
			deletedParts.length > 0,
	});

	const handleHasarParcaSubmit = async () => {
		try {
			for (const part of selectedParts) {
				if (part.id?.startsWith("new-id")) {
					await createHasarMutation.mutate(part);
				} else {
					if (updatedParts.includes(part.id)) {
						await updateHasarMutation.mutate(part);
					}
				}
			}

			for (const id of deletedParts) {
				deleteHasarMutation.mutate(id);
			}
		} catch (error) {
			console.error("An error occurred while saving parts", error);
		}
	};

	const hasarliParcaPath = {
		[HasarliParcaListesi[0]]:
			"M 53.050136,16.323119 V 18.7153 h -2.673614 l 0.07036,10.272308 3.588272,1.19609 c 0,0 0.02759,3.258609 1.055374,6.472961 1.042239,3.259543 1.758957,3.940063 1.758957,3.940063 l 30.53549,0.140717 0.140716,-1.336807 c 0,0 -6.779662,-1.283033 -12.101623,-8.865142 -4.842892,-6.899589 -5.065795,-14.212371 -5.065795,-14.212371 z",
		[HasarliParcaListesi[1]]:
			"M 120.5957 16.119141 C 120.5957 16.119141 120.94082 23.506935 115.37305 31.044922 C 110.72421 37.338785 101.5918 40.199219 101.5918 40.199219 C 101.5918 40.199219 116.2374 59.400195 142.98438 72.089844 C 165.1851 82.622602 192.13672 85.472656 192.13672 85.472656 C 192.13672 85.472656 186.76509 62.519734 184.47656 50.994141 C 182.18802 39.468548 178.40625 16.318359 178.40625 16.318359 L 120.5957 16.119141 z M 181.29102 52.835938 L 188.05859 82.087891 C 188.05859 82.087891 179.15344 81.688355 152.98438 71.890625 C 131.66408 63.908275 120.09766 52.935547 120.09766 52.935547 L 181.29102 52.835938 z ",
		[HasarliParcaListesi[2]]:
			"M 180.69531 16.21875 C 180.69531 16.21875 184.37656 39.436303 186.71484 50.945312 C 189.05313 62.454322 194.72461 85.273438 194.72461 85.273438 L 236.41602 85.472656 L 254.02734 43.482422 L 253.92773 40.894531 C 253.92773 40.894531 244.96115 40.019223 238.10742 33.482422 C 231.05678 26.757807 230.44531 16.318359 230.44531 16.318359 L 180.69531 16.21875 z M 190.84375 52.835938 L 245.37109 53.035156 L 233.53125 82.087891 L 197.41211 82.087891 L 190.84375 52.835938 z ",
		[HasarliParcaListesi[3]]:
			"m 281.98759,16.268515 15.82076,0.04975 c 0,0 -0.0828,2.084693 2.41292,4.00494 2.45508,1.888962 4.10444,1.815905 4.10444,1.815905 l 0.0995,7.014864 -5.27359,5.024832 0.0498,6.368104 -34.17881,0.199003 0.0498,-1.19402 c 0,0 8.04389,-2.475597 12.63666,-9.900411 4.84771,-7.836955 4.27852,-13.382967 4.27852,-13.382967 z",
		[HasarliParcaListesi[4]]:
			"M 319.28516 89.496094 L 317.17578 91.607422 L 317.31641 178.42773 L 319.84961 180.67969 L 335.46875 180.53906 L 337.4375 178.28711 L 337.4375 92.029297 L 335.04688 89.636719 L 319.28516 89.496094 z M 326.84961 93.277344 C 330.73104 93.283207 331.10547 97.023438 331.10547 97.023438 L 331.14062 107.29688 C 331.14062 107.29687 330.49654 110.9903 326.79688 110.9375 C 323.09721 110.88473 322.45117 107.40234 322.45117 107.40234 L 322.38086 96.777344 C 322.38086 96.777344 322.96817 93.271444 326.84961 93.277344 z M 326.81445 159.25586 C 330.29719 159.31449 331.17578 162.98438 331.17578 162.98438 L 331.10547 173.39844 C 331.10547 173.39844 330.10961 176.71671 326.74414 176.75781 C 323.37867 176.79885 322.52148 173.43359 322.52148 173.43359 L 322.31055 162.84375 C 322.31055 162.84375 323.33172 159.19726 326.81445 159.25586 z ",
		[HasarliParcaListesi[5]]:
			"m 280.30735,91.887902 c 0,0 5.17133,-1.254722 7.91531,-1.653419 2.74397,-0.398697 8.54853,-0.738762 8.54853,-0.738762 0,0 8.76334,18.904069 8.51335,45.873599 -0.26826,28.94071 -8.37264,45.02929 -8.37264,45.02929 0,0 -4.78044,0.25228 -8.05779,-0.2551 -3.86275,-0.598 -8.40604,-1.99637 -8.40604,-1.99637 0,0 6.79778,-20.31105 6.96547,-42.84819 0.16456,-22.11684 -7.10619,-43.411048 -7.10619,-43.411048 z",
		[HasarliParcaListesi[6]]:
			"m 189.9486,103.18318 0.0995,63.38253 c 0,0 15.19058,-0.96185 22.83562,-0.94527 7.64504,0.0166 23.03462,1.04477 23.03462,1.04477 l 0.19901,-63.28304 c 0,0 -15.38958,1.02819 -23.08438,0.99502 -7.69479,-0.0332 -23.08437,-1.19401 -23.08437,-1.19401 z",
		[HasarliParcaListesi[7]]:
			"m 117.92046,86.540673 c 0,0 -27.053425,1.880421 -36.892985,2.644471 -13.060508,1.01416 -22.067244,2.843475 -22.067244,2.843475 0,0 -10.741363,7.973941 -10.764815,42.637111 -0.02345,34.66318 10.483382,43.05927 10.483382,43.05927 0,0 7.22345,2.25146 18.785659,3.16612 9.89172,0.7825 40.596723,2.60325 40.596723,2.60325 0,0 -8.1719,-17.84824 -7.63248,-48.07884 0.53941,-30.23061 7.49176,-48.874857 7.49176,-48.874857 z",
		[HasarliParcaListesi[8]]:
			"M 22.716797 87.515625 C 22.296634 87.522598 21.333968 87.660863 20.349609 88.650391 C 18.91418 90.093358 19.253906 91.267578 19.253906 91.267578 L 19.335938 177.63477 C 19.335938 177.63477 19.448577 178.70584 20.216797 179.66211 C 21.039875 180.68636 21.951172 180.67969 21.951172 180.67969 L 36.386719 180.67969 C 36.386719 180.67969 37.523747 180.34715 38.123047 179.48242 C 38.624777 178.75847 38.697266 177.44336 38.697266 177.44336 L 38.837891 90.621094 C 38.837891 90.621094 38.755873 89.872097 37.779297 88.794922 C 36.706881 87.612035 36.023438 87.666016 36.023438 87.666016 L 22.9375 87.525391 C 22.9375 87.525391 22.856851 87.513301 22.716797 87.515625 z M 25.505859 94.095703 C 25.598184 94.09356 25.694486 94.098364 25.792969 94.109375 C 27.085788 94.253927 29.44209 94.004073 31.59375 96.056641 C 33.238942 97.626066 33.419922 99.626953 33.419922 99.626953 L 33.630859 113.98047 C 33.630859 113.98047 33.622256 114.9193 33.265625 114.93945 C 32.179552 115.00075 31.873047 114.75391 31.873047 114.75391 C 31.873047 114.75391 27.182479 112.31792 25.787109 111.06445 C 24.415057 109.83192 23.570312 107.29688 23.570312 107.29688 L 23.429688 95.546875 C 23.429688 95.546875 24.120994 94.127857 25.505859 94.095703 z M 32.515625 155.22266 C 33.299725 155.25354 33.490234 156.05469 33.490234 156.05469 L 33.560547 170.54883 C 33.560547 170.54883 33.140974 173.10912 31.376953 174.57031 C 29.875493 175.81401 27.270581 176.18103 26.34375 176.27734 C 23.558501 176.56678 23.535156 174.98047 23.535156 174.98047 L 23.675781 163.01953 C 23.675781 163.01953 23.895145 160.70174 25.552734 159.52539 C 26.51302 158.8439 29.310117 157.02741 31.041016 155.80469 C 31.680208 155.35316 32.159216 155.20862 32.515625 155.22266 z ",
		[HasarliParcaListesi[9]]:
			"m 56.715924,229.64974 c 0,0 -1.562522,3.38 -2.001987,5.0964 -0.439466,1.7164 -0.634806,5.20202 -0.634806,5.20202 l -3.582058,1.39302 v 10.14917 l 2.537291,5e-5 0.02488,2.46267 17.393943,0.0746 c 0,0 -0.06663,-7.92463 4.907906,-14.15442 6.178222,-7.73723 12.051085,-9.07921 12.051085,-9.07921 v -1.14427 z",
		[HasarliParcaListesi[10]]:
			"M 192.13672 184.77539 C 192.13672 184.77539 171.05745 185.38659 142.26172 198.65039 C 118.0444 209.8053 101.29297 229.94922 101.29297 229.94922 C 101.29297 229.94922 110.38806 232.23282 115.23047 238.91602 C 120.07287 245.5992 120.79492 253.92773 120.79492 253.92773 L 178.60547 254.12695 C 178.60547 254.12695 182.03294 231.26402 184.24414 219.93164 C 186.54368 208.1465 192.13672 184.77539 192.13672 184.77539 z M 187.95898 188.25781 L 181.58984 217.41016 L 120.35938 217 C 120.35938 217 136.92234 204.37693 153.97852 197.89258 C 174.31971 190.15934 187.95898 188.25781 187.95898 188.25781 z ",
		[HasarliParcaListesi[11]]:
			"M 194.52539 184.57617 C 194.52539 184.57617 189.15748 207.17706 186.87109 218.52734 C 184.51408 230.22824 180.5957 253.72852 180.5957 253.72852 L 230.54492 253.92773 C 230.54492 253.92773 230.62943 244.00261 237.41211 237.40234 C 244.1948 230.80208 253.92773 229.25195 253.92773 229.25195 L 253.92773 226.66406 L 236.2168 184.57617 L 194.52539 184.57617 z M 197.41211 187.85938 L 233.23242 187.95898 L 245.27148 217.3125 L 190.84375 217.01367 L 197.41211 187.85938 z ",
		[HasarliParcaListesi[12]]:
			"m 264.96038,229.59999 -0.0124,1.29352 c 0,0 7.3661,2.58006 12.27131,9.03071 4.90521,6.45066 4.9176,14.05367 4.9176,14.05367 l 15.89538,0.0497 c 0,0 -0.0236,-2.34918 2.10745,-3.88316 2.13099,-1.53399 4.23578,-1.76356 4.23578,-1.76356 l -0.0995,-7.38799 -5.07458,-4.87558 v -6.46761 z",
	};

	return (
		<div className="w-full space-y-3">
			<div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
				<div className="absolute inset-0 bg-black/10" />
				<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
				<div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
				<div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
				<div className="relative p-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div className="flex items-center gap-4">
							<div className="relative">
								<div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
								<div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
									<MapPin className="h-7 w-7 text-white" />
								</div>
							</div>
							<div>
								<h1 className="text-3xl font-bold text-white mb-2">
									Araç Hasarları
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 min-h-auto">
				<svg
					version="1.1"
					id="svg1"
					viewBox="0 0 367.35999 272.64001"
					className="scale-75 rotate-90 w-full mx-auto max-w-4xl"
				>
					<defs>
						<linearGradient
							id="Gradient_local"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="0%"
						>
							<stop
								offset="0%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop offset="5%" stopColor="rgb(255, 219, 77)" stopOpacity="1" />
							<stop
								offset="10%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="15%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="20%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="25%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="30%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="35%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="40%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="45%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="50%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="55%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="60%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="65%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="70%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="75%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="80%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="85%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="90%"
								stopColor="rgb(255, 255, 255)"
								stopOpacity="1"
							/>
							<stop
								offset="95%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
							<stop
								offset="100%"
								stopColor="rgb(255, 219, 77)"
								stopOpacity="1"
							/>
						</linearGradient>
					</defs>
					<g id="g1">
						{HasarliParcaListesi.map((parca) => (
							<path
								stroke="#000000"
								strokeWidth="1"
								id={parca}
								key={parca}
								d={hasarliParcaPath[parca]}
								className={cn(
									"cursor-pointer hover:fill-gray-300",
									getFillColorClass(parca),
								)}
								onClick={() => setSelectedPart(parca)}
							/>
						))}
					</g>
				</svg>
				<div className="space-y-4">
					<div
						className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 h-full
					"
					>
						<div className="flex flex-col md:flex-row justify-between items-center">
							<div>
								<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
									<AlertTriangle className="h-5 w-5 text-amber-500" />
									Seçilen Hasarlı Parçalar ({selectedParts.length})
								</h3>
							</div>
							<Button onClick={handleHasarParcaSubmit}>Kaydet</Button>
						</div>
						{selectedParts.length === 0 ? (
							<div className="text-center py-8">
								<div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
									<Car className="h-8 w-8 text-slate-400" />
								</div>
								<p className="text-slate-500 dark:text-slate-400 text-sm">
									Henüz hasar seçilmedi
								</p>
								<p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
									Araç diyagramından hasarlı parçaları seçin
								</p>
							</div>
						) : (
							<div className="space-y-3 max-h-[35rem] overflow-y-auto">
								{selectedParts.map((damage) => (
									<div
										key={damage.id}
										className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all duration-200"
									>
										<div className="flex items-start justify-between">
											<div className="flex items-start gap-3 flex-1">
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-2">
														<h4 className="font-semibold text-slate-900 dark:text-slate-100">
															{HasarliParcaListesiLabel[damage.hasarliParca]} -{" "}
															{HasarTipiListesiLabel[damage.hasarTipi]}
														</h4>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-1 ml-2">
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
													onClick={() => setSelectedPart(damage.hasarliParca)}
												>
													<Edit className="h-3 w-3" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
													onClick={() =>
														setSelectedParts((prevState) => {
															if (isUUID(damage.id)) {
																setDeletedParts((prevState) => [
																	...prevState,
																	damage.id,
																]);
																return prevState.filter(
																	(part) => part.id !== damage.id,
																);
															}
															return prevState.filter(
																(part) => part.id !== damage.id,
															);
														})
													}
												>
													<X className="h-3 w-3" />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			<AlertDialog open={status === "blocked"}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
						<AlertDialogDescription>
							Değişiklikleri kaydetmediniz
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={reset}>İptal et</AlertDialogCancel>
						<AlertDialogAction onClick={proceed}>Devam et</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{selectedPart &&
				!selectedParts.find((part) => part.hasarliParca === selectedPart) && (
					<HasarDialog
						mode="create"
						open={dialogState.create}
						close={closeDialog}
						aracFiloId={aracFiloId}
						hasarliParca={selectedPart}
						setSelectedPart={setSelectedPart}
						setUpdatedParts={setUpdatedParts}
						setSelectedParts={setSelectedParts}
					/>
				)}

			{selectedPart &&
				selectedParts.find((part) => part.hasarliParca === selectedPart) && (
					<HasarDialog
						mode="update"
						open={dialogState.update}
						close={closeDialog}
						aracFiloId={aracFiloId}
						hasarliParca={selectedPart}
						setSelectedPart={setSelectedPart}
						setUpdatedParts={setUpdatedParts}
						setSelectedParts={setSelectedParts}
						initialValues={
							selectedParts.find((part) => part.hasarliParca === selectedPart)!
						}
					/>
				)}
		</div>
	);
}
