import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { LoginFormData } from "@features/auth/types";
import { useLogin, useGoogleLogin } from "@features/auth/hooks";
import { useTranslation } from "react-i18next";


const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(["auth", "common"]);

  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        router.push("/");
      },
      onError: (err) => setError(err.message),
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = (credentialResponse: any) => {
    setError(null);
    googleLoginMutation.mutate(credentialResponse.credential, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.accessToken);
        router.push("/");
      },
      onError: (err) => setError(err.message),
    });
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
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

          {error && (
            <div className={styles.errorBanner}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
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

            {/* PASSWORD */}
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
                <span className={styles.error}>{t(errors.password.message!)}</span>
              )}
            </div>

            {/* SUBMIT */}
            <p className={styles.footer}>
              {t("auth.noAccount")}? <Link href="/register">{t('auth.signUp')}</Link>
            </p>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loginMutation.isPending || googleLoginMutation.isPending}
            >
              {loginMutation.isPending ? '...' : t('auth.signIn')}
            </button>
          </form>

          {/* DIVIDER */}
          <div className={styles.divider}>
            <span>{t("common.or") || "or"}</span>
          </div>

          {/* GOOGLE LOGIN */}
          <div className={styles.googleContainer}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              size="large"
            />
          </div>
        </div>
      </div>

    </main>
  );
};

export default LoginPage;
