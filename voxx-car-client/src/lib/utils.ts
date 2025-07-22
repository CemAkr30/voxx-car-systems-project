import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	const formattedDate = new Date(date);
	return new Intl.DateTimeFormat("tr-TR", {
		day: "numeric",
		month: "long",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(formattedDate);
}

export function relativeDate(date: string) {
	const now = new Date();
	const past = new Date(date);
	const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat("tr-TR", { numeric: "auto" });

	const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
		{ amount: 60, unit: "second" },
		{ amount: 60, unit: "minute" },
		{ amount: 24, unit: "hour" },
		{ amount: 7, unit: "day" },
		{ amount: 4.34524, unit: "week" },
		{ amount: 12, unit: "month" },
		{ amount: Number.POSITIVE_INFINITY, unit: "year" },
	];

	let duration = diffInSeconds;
	for (const { amount, unit } of divisions) {
		if (Math.abs(duration) < amount) {
			return rtf.format(-Math.round(duration), unit);
		}
		duration = duration / amount;
	}

	return rtf.format(-Math.round(duration), "year");
}

export const isUUID = (str: string) =>
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
		str,
	);

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("tr-TR", {
		style: "currency",
		currency: "TRY",
	}).format(amount);
};

export const getPaymentTypeColor = (type: string) => {
	const colors = {
		NAKIT:
			"bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
		VISA: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
		MASTERCARD: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
		AMERICAN_EXPRESS:
			"bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
		BANKA_EFT:
			"bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
		BANKA_HAVALE:
			"bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
		CARI_HESAP:
			"bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
		IKRAM: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
		VOUCHER:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
		ODENMEDI:
			"bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
	};
	return (
		colors[type as keyof typeof colors] ||
		"bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
	);
};
