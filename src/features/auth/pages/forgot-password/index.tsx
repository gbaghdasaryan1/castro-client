import styles from "./forgotPassword.module.scss";
import { ForgotPasswordForm } from "@features/auth/components/forgot-password-form";
import { LoginBranding } from "@features/auth/components/login-branding";

export const ForgotPasswordPage = () => (
    <main className={styles.page}>
        <div className={styles.background}>
            <div className={`${styles.blur} ${styles["blur-left"]}`} />
            <div className={`${styles.blur} ${styles["blur-right"]}`} />
        </div>
        <div className={styles.container}>
            <LoginBranding />
            <ForgotPasswordForm />
        </div>
    </main>
);
