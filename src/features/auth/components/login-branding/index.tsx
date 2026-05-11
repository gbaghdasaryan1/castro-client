import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./loginBranding.module.scss";

export const LoginBranding: FC = () => {
    const { t } = useTranslation("auth");
    return (
        <div className={styles.branding}>
            <h1>Castro</h1>
            <p>{t("auth.login.subtitle")}</p>
        </div>
    );
};

