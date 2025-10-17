import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/web/spinner";
import { useAppForm } from "@/hooks/demo.form";
import { getAracFiloQueryOptions, useUpdateAracFiloTramerMutation } from "@/hooks/use-arac-filo-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	Shield,
	RefreshCw
} from "lucide-react";
import React, { useState } from "react";

export const Route = createFileRoute(
	"/_authenticated/arac-filo/$aracFiloId/_layout/detay/",
)({
	loader: ({ context: { queryClient } , params: { aracFiloId } }) => {
		queryClient.ensureQueryData(getAracFiloQueryOptions(aracFiloId));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { aracFiloId } = useParams({ from: "/_authenticated/arac-filo/$aracFiloId" });
	const { data: aracFilo } = useSuspenseQuery(getAracFiloQueryOptions(aracFiloId));
	const updateAracFiloTramerMutation = useUpdateAracFiloTramerMutation();
	const form = useAppForm({
		defaultValues: {
			tramer: aracFilo.tramer,
			tramerTutari: aracFilo.tramerTutari,
		},
		onSubmit: async ({ formApi, value }) => {
			try {
				await updateAracFiloTramerMutation.mutateAsync({ aracFiloId, tramer: value.tramer, tramerTutari: value.tramerTutari });
				formApi.reset();
			} catch (error) {
				console.error("Tramer güncelleme hatası:", error);
			} finally {
			}
		},
	});

	return (
		<React.Fragment>
			<div className="space-y-6">
				{/* Tramer Güncelleme Formu */}
				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
					<div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-t-2xl">
						<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
							<Shield className="h-5 w-5" />
							Tramer Bilgileri Güncelle
						</h2>
					</div>
					<div className="p-6">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="space-y-4"
						>
							<form.AppField name="tramer">
								{(field) => <field.Checkbox label="Tramer kaydı var mı?" />}
							</form.AppField>
							<form.Subscribe selector={(state) => state.values.tramer}>
								{(tramer) => (
									<form.AppField name="tramerTutari">
										{(field) => (
											<field.TextField
												label="Tramer Tutarı"
												placeholder="0"
												disabled={!tramer}
											/>
										)}
									</form.AppField>
								)}
							</form.Subscribe>
							<div className="flex justify-end space-x-4 pt-4">
								<form.Subscribe selector={(state) => state.isSubmitting}>
									{(isSubmitting) => (
										<Button type="submit" disabled={isSubmitting} className="w-full">
											{isSubmitting && <Spinner />} Tramer Güncelle
										</Button>
									)}
								</form.Subscribe>
							</div>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
