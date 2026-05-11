import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./loginForm.module.scss";
import { LoginFormData } from "@features/auth/types";
import { useLogin } from "@features/auth/hooks";
import { GoogleAuthBtn } from "@shared/components/GoogeAuthBtn";

export const LoginForm: FC = () => {
    const router = useRouter();
    const { t } = useTranslation(["auth", "common"]);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { mutate: loginMutate, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        setError(null);
        loginMutate(data, {
            onSuccess: (res: { accessToken: string }) => {
                localStorage.setItem("token", res.accessToken);
                router.push("/");
            },
            onError: (err: Error) => setError(err.message),
        });
    };

    return (
        <div className={styles.glassCard}>
            <header className={styles.header}>
                <h2>{t("auth.welcomeBack")}</h2>
                <p>{t("auth.enterYourDetails")}</p>
            </header>

            {error && <div className={styles.errorBanner}>{error}</div>}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label>{t("common.emailAddress")}</label>
                    <input
                        type="email"
                        placeholder="artist@castro.com"
                        {...register("email", {
                            required: "common.emailIsRequired",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "auth.invalidEmail",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className={styles.error}>{t(errors.email.message!)}</span>
                    )}
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldTop}>
                        <label>{t("common.password")}</label>
                        <Link href="#">{t("auth.forgotPassword")}?</Link>
                    </div>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password", {
                                required: "common.passwordIsRequired",
                                minLength: {
                                    value: 6,
                                    message: "auth.minPasswordLength",
                                },
                            })}
                        />
                        <button type="button" onClick={() => setShowPassword((p) => !p)}>
                            {showPassword ? "🙈" : "👁"}
                        </button>
                    </div>
                    {errors.password && (
                        <span className={styles.error}>{t(errors.password.message!)}</span>
                    )}
                </div>

                <p className={styles.footer}>
                    {t("auth.noAccount")}?{" "}
                    <Link href="/register">{t("auth.signUp")}</Link>
                </p>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isPending}
                >
                    {isPending ? "..." : t("auth.signIn")}
                </button>
            </form>

            <div className={styles.divider}>
                <span>{t("common.or") || "or"}</span>
            </div>

            <GoogleAuthBtn />
        </div>
    );
};
