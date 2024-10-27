import { useState, useRef } from "react";
import styles from "./ValidationForm.module.css";

export const ValidationFormLayout = () => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordNotEqual, setPasswordNotEqual] = useState("");

	// const submitButtonRef = useRef(null);

	// const checkFullnessFields = () => {
	// 	console.log(Boolean(email), Boolean(password), Boolean(passwordRepeat));
	// 	if (email && password && passwordRepeat) {
	// 		submitButtonRef.current.focus();
	// 	}
	// };

	const onSubmit = (event) => {
		event.preventDefault();
		if (password !== passwordRepeat) {
			setPasswordNotEqual(true);
			return;
		}
		console.log({
			email: email,
			password: password,
			passwordRepeat: passwordRepeat,
		});
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		let newError = null;

		if (!/^[a-zA-Z0-9.@]*$/.test(target.value)) {
			newError =
				"Некорректный email. Допускаются только латинские буквы, цифры и точка.";
		}

		setEmailError(newError);
	};

	return (
		<div className={styles.Form}>
			<form onSubmit={onSubmit}>
				ValidationForm
				<div className={styles.backGroundGray}>
					<input
						className={styles.email}
						name="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={onEmailChange}
						//onBlur={checkFullnessFields}
					/>
					<input
						className={styles.password}
						name="password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={(v) => {
							setPassword(v.target.value);
							setPasswordNotEqual(false);
						}}
						//onBlur={checkFullnessFields}
					/>
					<input
						className={styles.password}
						name="passwordRepeat"
						type="password"
						placeholder="Повтор пароля"
						value={passwordRepeat}
						onChange={(v) => {
							setPasswordRepeat(v.target.value);
							setPasswordNotEqual(false);
						}}
						//onBlur={checkFullnessFields}
					/>
					<button
						className={styles.button}
						type="submit"
						disabled={
							!!emailError ||
							!email ||
							!password ||
							!passwordRepeat
						}
						//ref={submitButtonRef}
					>
						Зарегестрироваться
					</button>
				</div>
				<div>
					{emailError && (
						<div className={styles.errorLabel}>{emailError}</div>
					)}
				</div>
				<div>
					{passwordNotEqual && (
						<div className={styles.errorLabel}>
							{"Пароли должны совпадать."}
						</div>
					)}
				</div>
			</form>
		</div>
	);
};
