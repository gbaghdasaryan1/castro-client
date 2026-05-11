import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styles from "./loginForm.module.scss";
import { LoginFormData } from "@features/auth/types";
import { useLogin } from "@features/auth/hooks";
import { GoogleAuthBtn } from "@shared/components/GoogeAuthBtn";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";

export const LoginForm: FC = () => {
    const router = useRouter();
    const { t } = useTranslation(["auth", "common"]);
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
            onSuccess: (res) => {
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
                <Input
                    label={t("common.emailAddress")}
                    type="email"
                    placeholder="artist@castro.com"
                    error={errors.email ? t(errors.email.message!) : undefined}
                    {...register("email", {
                        required: "common.emailIsRequired",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "auth.invalidEmail",
                        },
                    })}
                />

                <Input
                    label={t("common.password")}
                    type="password"
                    placeholder="••••••••"
                    rightLabel={
                        <Link href="/forgot-password">{t("auth.forgotPassword")}?</Link>
                    }
                    error={errors.password ? t(errors.password.message!) : undefined}
                    {...register("password", {
                        required: "common.passwordIsRequired",
                        minLength: {
                            value: 6,
                            message: "auth.minPasswordLength",
                        },
                    })}
                />

                <p className={styles.footer}>
                    {t("auth.noAccount")}?{" "}
                    <Link href="/register">{t("auth.signUp")}</Link>
                </p>

                <Button
                    type="submit"
                    fullWidth
                    loading={isPending}
                >
                    {t("auth.signIn")}
                </Button>
            </form>

            <div className={styles.divider}>
                <span>{t("common.or") || "or"}</span>
            </div>

            <GoogleAuthBtn />
        </div>
    );
};
