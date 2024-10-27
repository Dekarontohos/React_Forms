import { useState } from "react";
import styles from "./ValidationForm.module.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	email: Yup.string().matches(
		/^[a-zA-Z0-9.@]*$/,
		"Некорректный email. Допускаются только латинские буквы, цифры и точка.",
	),
	passwordRepeat: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Пароли должны совпадать.",
	),
});

export const ValidationFormLayout = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [errors, setErrors] = useState({});

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		try {
			validationSchema.validateSync({
				email,
			});
			setErrors({});
		} catch (error) {
			const newErrors = {};
			newErrors[error.path] = error.message;
			setErrors(newErrors);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			validationSchema.validateSync({
				email,
				password,
				passwordRepeat,
			});
			setErrors({});
		} catch (error) {
			const newErrors = {};
			newErrors[error.path] = error.message;
			setErrors(newErrors);
		}
		console.log({
			email: email,
			password: password,
			passwordRepeat: passwordRepeat,
		});
	};

	return (
		<div className={styles.Form}>
			<form onSubmit={onSubmit}>
				ValidationForm Yup
				<div className={styles.backGroundGray}>
					<input
						className={styles.email}
						name="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={onEmailChange}
					/>
					<input
						className={styles.password}
						name="password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={(v) => {
							setPassword(v.target.value);
							//setPasswordNotEqual(false);
						}}
					/>
					<input
						className={styles.password}
						name="passwordRepeat"
						type="password"
						placeholder="Повтор пароля"
						value={passwordRepeat}
						onChange={(v) => {
							setPasswordRepeat(v.target.value);
							//setpasswordNotEqual(false);
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
					<div className={styles.errorLabel}>{errors.email}</div>
				)}
				{errors.passwordRepeat && (
					<div className={styles.errorLabel}>
						{errors.passwordRepeat}
					</div>
				)}
			</form>
		</div>
	);
};
