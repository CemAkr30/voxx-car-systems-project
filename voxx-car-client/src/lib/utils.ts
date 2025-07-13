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
