// @ts-expect-error
import * as FileSaver from "file-saver";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";

export const ExportToExcel = ({
	apiData,
	fileName,
}: { apiData: unknown[]; fileName: string }) => {
	const type =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const extension = ".xlsx";

	const exportToCSV = (apiData: unknown[], fileName: string) => {
		const ws = XLSX.utils.json_to_sheet(apiData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type });
		FileSaver.saveAs(data, fileName + extension);
	};

	return (
		<Button
			onClick={() => exportToCSV(apiData, fileName)}
			variant="ghost"
			className="text-white backdrop-blur-sm"
		>
			<Download className="w-4 h-4 mr-2" />
			Dışarı Aktar
		</Button>
	);
};
