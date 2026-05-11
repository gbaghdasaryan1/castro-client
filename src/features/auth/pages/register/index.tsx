import { RegisterLeftPanel } from "@features/auth/components/register-left-panel";
import styles from "./register.module.scss";
import RegisterForm from "@features/auth/components/register-form";
import { FC } from "react";

export const RegisterPage: FC = () => (
  <main className={styles.page}>
    <RegisterLeftPanel />
    <section className={styles.right}>
      <RegisterForm />
    </section>
  </main>
);

