import { FC } from "react";
import styles from "./registerLeftPanel.module.scss";

export const RegisterLeftPanel: FC = () => (
  <section className={`${styles.left} ${styles.bgModernTech}`}>
    <div className={styles.overlay} />

    <div className={styles.particles} aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <span key={i} className={styles.particle} />
      ))}
    </div>

    <div className={styles.leftContent}>
      <h1>Elevate your craft.</h1>
      <p>Join a global collective of elite artisans and discerning collectors.</p>
    </div>

    <div className={styles.blob} />
  </section>
);

