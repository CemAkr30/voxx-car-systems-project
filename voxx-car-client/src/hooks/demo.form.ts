import { createFormHook } from "@tanstack/react-form";

import {
	Checkbox,
	DatePicker,
	Select,
	SubscribeButton,
	TextArea,
	TextField,
} from "../components/demo.FormComponents";
import { fieldContext, formContext } from "./demo.form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		Select,
		DatePicker,
		TextArea,
		Checkbox,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
