import { FC, ReactNode } from "react";
import styles from "./mainLayout.module.scss"

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className={styles.mainLayout}>
            {children}
        </main>
    );
};