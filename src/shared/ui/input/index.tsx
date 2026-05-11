import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    rightLabel?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, error, rightLabel, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className={styles.field}>
                {(label || rightLabel) && (
                    <div className={styles.top}>
                        {label && <label>{label}</label>}
                        {rightLabel}
                    </div>
                )}
                <div className={styles.inputWrapper}>
                    <input
                        ref={ref}
                        type={resolvedType}
                        className={styles.input}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className={styles.toggle}
                            onClick={() => setShowPassword((p) => !p)}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>
                    )}
                </div>
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";
