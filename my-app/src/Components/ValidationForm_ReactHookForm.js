import { useForm } from "react-hook-form";
import styles from "./ValidationForm.module.css";

export const ValidationFormLayout = () => {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const { password, passwordRepeat } = data;

		if (password !== passwordRepeat) {
			setError("passwordRepeat", {
				message: "Пароли должны совпадать.",
			});
		} else {
			clearErrors("passwordRepeat");
			console.log("Регистрация прошла успешно:", data);
		}
	};

	const emailValidationPattern = /^[a-zA-Z0-9.@]*$/;

	return (
		<div className={styles.Form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				ValidationForm React Hook Form
				<div className={styles.backGroundGray}>
					<input
						className={styles.email}
						type="email"
						placeholder="Email"
						{...register("email", {
							required: "Поле email обязательно",
							pattern: {
								value: emailValidationPattern,
								message:
									"Некорректный email. Допускаются только латинские буквы, цифры и точка.",
							},
						})}
					/>
					<input
						className={styles.password}
						type="password"
						placeholder="Пароль"
						{...register("password", {
							required: "Поле пароль обязательно",
						})}
					/>
					<input
						className={styles.password}
						type="password"
						placeholder="Повтор пароля"
						{...register("passwordRepeat", {
							required: "Поле повтор пароля обязательно",
						})}
					/>
					<button
						className={styles.button}
						type="submit"
						disabled={
							!watch("email") ||
							!watch("password") ||
							!watch("passwordRepeat") ||
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
