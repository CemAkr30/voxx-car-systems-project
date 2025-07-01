import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "../hooks/demo.form-context";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import * as ShadcnSelect from "@/components/ui/select";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Spinner from "./web/spinner";
import type React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting} className="w-full">
					{isSubmitting && <Spinner />} {label}
				</Button>
			)}
		</form.Subscribe>
	);
}

function ErrorMessages({
	errors,
}: {
	errors: Array<string | { message: string }>;
}) {
	return (
		<>
			{errors.map((error) => (
				<div
					key={typeof error === "string" ? error : error.message}
					className="text-sm text-red-500 mt-1"
				>
					{typeof error === "string" ? error : error.message}
				</div>
			))}
		</>
	);
}

export function TextField({
	label,
	placeholder,
	...props
}: React.ComponentProps<"input"> & { label?: string }) {
	const field = useFieldContext<string | number>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			{label && (
				<Label htmlFor={label} className="text-sm font-medium text-gray-700">
					{label}
				</Label>
			)}
			<Input
				{...props}
				id={label}
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(e) =>
					field.handleChange(
						props.type === "number" ? +e.target.value : e.target.value,
					)
				}
				className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function TextArea({
	label,
	placeholder,
	rows = 3,
}: {
	label: string;
	placeholder?: string;
	rows?: number;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<Label htmlFor={label} className="text-sm font-medium text-gray-700">
				{label}
			</Label>
			<ShadcnTextarea
				id={label}
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				rows={rows}
				onChange={(e) => field.handleChange(e.target.value)}
				className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function DatePicker({
	label,
	disabled = false,
}: {
	label: string;
	disabled?: boolean;
}) {
	const field = useFieldContext<Date>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<Label htmlFor={label} className="text-sm font-medium text-gray-700">
				{label}
			</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						data-empty={!field.state.value}
						className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-10"
						disabled={disabled}
					>
						<CalendarIcon />
						{field.state.value
							? format(field.state.value, "PPP")
							: format(new Date(), "PPP")}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={field.state.value}
						onSelect={(e) => field.handleChange(e || new Date())}
					/>
				</PopoverContent>
			</Popover>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Checkbox({
	label,
}: {
	label: string;
}) {
	const field = useFieldContext<boolean>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<Label className="text-sm font-medium text-gray-700">{label}</Label>
			<ShadcnCheckbox
				checked={field.state.value}
				onCheckedChange={(checked: boolean) => field.handleChange(checked)}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Select({
	label,
	values,
	placeholder,
	disabled = false,
}: {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
	disabled?: boolean;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<Label className="text-sm font-medium text-gray-700">{label}</Label>
			<ShadcnSelect.Select
				disabled={disabled}
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
			>
				<ShadcnSelect.SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
					<ShadcnSelect.SelectValue placeholder={placeholder} />
				</ShadcnSelect.SelectTrigger>
				<ShadcnSelect.SelectContent>
					<ShadcnSelect.SelectGroup>
						{values.map((value, index) => (
							<ShadcnSelect.SelectItem
								key={`${value.value}-index-${index}`}
								value={value.value}
							>
								{value.label}
							</ShadcnSelect.SelectItem>
						))}
					</ShadcnSelect.SelectGroup>
				</ShadcnSelect.SelectContent>
			</ShadcnSelect.Select>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Slider({
	label,
	min = 0,
	max = 100,
	step = 1,
	showValue = true,
}: {
	label: string;
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
}) {
	const field = useFieldContext<number>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label htmlFor={label} className="text-sm font-medium text-gray-700">
					{label}
				</Label>
				{showValue && (
					<span className="text-sm text-gray-500 font-medium">
						{field.state.value}
					</span>
				)}
			</div>
			<div className="px-2">
				<ShadcnSlider
					id={label}
					min={min}
					max={max}
					step={step}
					onBlur={field.handleBlur}
					value={[field.state.value]}
					onValueChange={(value) => field.handleChange(value[0])}
					className="w-full"
				/>
			</div>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Switch({
	label,
	description,
}: { label: string; description?: string }) {
	const field = useFieldContext<boolean>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between space-x-2">
				<div className="space-y-0.5">
					<Label htmlFor={label} className="text-sm font-medium text-gray-700">
						{label}
					</Label>
					{description && (
						<p className="text-sm text-gray-500">{description}</p>
					)}
				</div>
				<ShadcnSwitch
					id={label}
					onBlur={field.handleBlur}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked)}
				/>
			</div>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

// Alternative compact Switch layout for simple cases
export function CompactSwitch({ label }: { label: string }) {
	const field = useFieldContext<boolean>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className="space-y-2">
			<div className="flex items-center space-x-2">
				<ShadcnSwitch
					id={label}
					onBlur={field.handleBlur}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked)}
				/>
				<Label htmlFor={label} className="text-sm font-medium text-gray-700">
					{label}
				</Label>
			</div>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}
