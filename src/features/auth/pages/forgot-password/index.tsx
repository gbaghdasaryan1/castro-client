import pageStyles from "../login/login.module.scss";
import { ForgotPasswordForm } from "@features/auth/components/forgot-password-form";
import { LoginBranding } from "@features/auth/components/login-branding";

export const ForgotPasswordPage = () => (
    <main className={pageStyles.page}>
        <div className={pageStyles.background}>
            <div className={`${pageStyles.blur} ${pageStyles["blur-left"]}`} />
            <div className={`${pageStyles.blur} ${pageStyles["blur-right"]}`} />
        </div>
        <div className={pageStyles.container}>
            <LoginBranding />
            <ForgotPasswordForm />
        </div>
    </main>
);
