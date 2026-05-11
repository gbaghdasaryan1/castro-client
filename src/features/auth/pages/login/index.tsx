import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import Link from "next/link";
import { LoginFormData } from "@features/auth/types";
import { useLogin } from "@features/auth/hooks";
import { useTranslation } from "react-i18next";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(["auth", "common"]);

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    loginMutation.mutate(data, {
      onSuccess: (res: { token: string }) => {
        console.log(res.token, "sssssss");

        localStorage.setItem("token", res.token);
        router.push("/");
      },
      onError: (err: Error) => setError(err.message),
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={`${styles.blur} ${styles["blur-left"]}`} />
        <div className={`${styles.blur} ${styles["blur-right"]}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.branding}>
          <h1>Castro</h1>
          <p>{t("auth.login.subtitle")}</p>
        </div>

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
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && (
                <span className={styles.error}>
                  {t(errors.password.message!)}
                </span>
              )}
            </div>

            <p className={styles.footer}>
              {t("auth.noAccount")}?{" "}
              <Link href="/register">{t("auth.signUp")}</Link>
            </p>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "..." : t("auth.signIn")}
            </button>
          </form>

          <div className={styles.divider}>
            <span>{t("common.or") || "or"}</span>
          </div>

          <div className={styles.googleContainer}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
