import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
}

export const Button = ({
  children,
  fullWidth,
  loading,
  href,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const cls = [styles.button, fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} disabled={disabled || loading} {...props}>
      {loading ? "..." : children}
    </button>
  );
};
