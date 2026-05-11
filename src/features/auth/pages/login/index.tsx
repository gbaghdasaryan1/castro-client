import styles from "./login.module.scss";
import { LoginForm } from "@features/auth/components/login-form";
import { LoginBranding } from "@features/auth/components/login-branding";

export const LoginPage = () => (
  <main className={styles.page}>
    <div className={styles.background}>
      <div className={`${styles.blur} ${styles["blur-left"]}`} />
      <div className={`${styles.blur} ${styles["blur-right"]}`} />
    </div>
    <div className={styles.container}>
      <LoginBranding />
      <LoginForm />
    </div>
  </main>
);

