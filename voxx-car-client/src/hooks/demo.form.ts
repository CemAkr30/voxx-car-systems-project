import { createFormHook } from "@tanstack/react-form";

import {
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
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
