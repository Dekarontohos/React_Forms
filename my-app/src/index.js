import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ValidationFormLayout } from "./Components/ValidationForm";
import { ValidationFormLayout as ValidationFormLayoutYup } from "./Components/ValidationForm_Yup";
import { ValidationFormLayout as ValidationFormLayoutReactHookForm } from "./Components/ValidationForm_ReactHookForm";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ValidationFormLayoutReactHookForm />
	</React.StrictMode>,
);
