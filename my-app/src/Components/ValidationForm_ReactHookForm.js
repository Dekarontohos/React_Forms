import React from "react";
import { useForm } from "react-hook-form";
import styles from "./ValidationForm.module.css";

export const ValidationFormLayout = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className={styles.Form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				ValidationForm ReactHookForm
				<div className={styles.backGroundGray}>
					<input
						className={styles.email}
						{...register("email", {
							required: "Email обязательное поле",
							pattern: {
								value: /^[a-zA-Z0-9.@]*$/,
								message:
									"Некорректный email. Допускаются только латинские буквы, цифры и точка.",
							},
						})}
						placeholder="Email"
					/>
					<input
						className={styles.password}
						{...register("password", {
							required: "Пароль обязательное поле",
						})}
						type="password"
						placeholder="Пароль"
					/>
					{errors.password && (
						<div className={styles.errorLabel}>
							{errors.password.message}
						</div>
					)}
					<input
						className={styles.password}
						{...register("passwordRepeat", {
							required: "Повтор пароля обязательное поле",
							validate: (value, getValues) => {
								if (value !== getValues().password) {
									return "Пароли должны совпадать.";
								}
							},
						})}
						type="password"
						placeholder="Повтор пароля"
					/>
					<button className={styles.button} type="submit">
						Зарегестрироваться
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
