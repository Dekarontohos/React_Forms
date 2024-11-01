import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ValidationFormLayout } from "./Components/ValidationForm";
import { ValidationFormLayout as ValidationFormLayoutYup } from "./Components/ValidationForm_Yup";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ValidationFormLayoutYup />
	</React.StrictMode>,
);
