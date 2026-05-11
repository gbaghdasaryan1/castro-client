import { FC } from "react";
import styles from "./registerLeftPanel.module.scss";

export const RegisterLeftPanel: FC = () => (
  <section className={styles.left}>
    <div className={styles.overlay} />
    <div className={styles.leftContent}>
      <h1>Elevate your craft.</h1>
      <p>Join a global collective of elite artisans and discerning collectors.</p>
    </div>
    <div className={styles.blob} />
  </section>
);

