import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ValidationForm.module.css";

export const ValidationFormLayout = () => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

	const validateEmail = (email) => {
		const regex = /^[a-zA-Z0-9.@]*$/;
		if (!regex.test(email)) {
			setError("email", {
				message:
					"Некорректный email. Допускаются только латинские буквы, цифры и точка.",
			});
		} else {
			clearErrors("email");
		}
	};

	const onSubmit = (data) => {
		const { email, password, passwordRepeat } = data;

		if (password !== passwordRepeat) {
			setError("passwordRepeat", {
				message: "Пароли должны совпадать.",
			});
		} else {
			clearErrors();
			console.log({ email, password, passwordRepeat });
		}
	};

	return (
		<div className={styles.Form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				ValidationForm React Hook Form
				<div className={styles.backGroundGray}>
					<input
						className={styles.email}
						name="email"
						type="email"
						placeholder="Email"
						{...register("email", {
							onChange: (event) => {
								setEmail(event.target.value);
								validateEmail(event.target.value);
							},
						})}
					/>
					<input
						className={styles.password}
						name="password"
						type="password"
						placeholder="Пароль"
						{...register("password", {})}
						onChange={(e) => {
							setPassword(e.target.value);
							clearErrors("passwordRepeat");
						}}
					/>
					<input
						className={styles.password}
						name="passwordRepeat"
						type="password"
						placeholder="Повтор пароля"
						{...register("passwordRepeat", {})}
						onChange={(e) => {
							setPasswordRepeat(e.target.value);
							clearErrors("passwordRepeat");
						}}
					/>
					<button
						className={styles.button}
						type="submit"
						disabled={
							!email ||
							!password ||
							!passwordRepeat ||
							errors.email
						}
					>
						Зарегистрироваться
					</button>
				</div>
				{errors.email && (
					<div className={styles.errorLabel}>
						{errors.email.message}
					</div>
				)}
				{errors.passwordRepeat && (
					<div className={styles.errorLabel}>
						{errors.passwordRepeat.message}
					</div>
				)}
			</form>
		</div>
	);
};
