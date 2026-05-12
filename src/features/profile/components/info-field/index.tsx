import { FC } from "react";
import styles from "./infoField.module.scss";

type Props = {
    label: string;
    value?: string | number | null;
    capitalize?: boolean;
}

export const Field: FC<Props> = ({ label, value, capitalize }) => (
    <div className={styles.field}>
        <span className={styles.fieldLabel}>{label}</span>
        <span
            className={[
                styles.fieldValue,
                !value && styles.empty,
                capitalize && styles.capitalize,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {value ?? "Not set"}
        </span>
    </div>
);