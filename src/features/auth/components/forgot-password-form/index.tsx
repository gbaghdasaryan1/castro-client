import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styles from "../login-form/loginForm.module.scss";
import { ForgotPasswordBody } from "@features/auth/types";
import { useForgotPassword } from "@features/auth/hooks";
import ResetPasswordModal from "@features/modal/components/ResetPasswordModal";
import { Input } from "@shared/ui/input";

export const ForgotPasswordForm: FC = () => {
    const [emailSent, setEmailSent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { mutate: forgotMutate, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordBody>();

    const onSubmit = (data: ForgotPasswordBody) => {
        setError(null);
        forgotMutate(data.email, {
            onSuccess: () => setEmailSent(data.email),
            onError: (err: Error) => setError(err.message),
        });
    };

    return (
        <>
            <div className={styles.glassCard}>
                <header className={styles.header}>
                    <h2>Forgot Password</h2>
                    <p>Enter your email and we&apos;ll send you a reset code.</p>
                </header>

                {error && <div className={styles.errorBanner}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="artist@castro.com"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email format",
                            },
                        })}
                    />

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isPending}
                    >
                        {isPending ? "..." : "Send Reset Code"}
                    </button>
                </form>

                <p className={styles.footer}>
                    <Link href="/login">← Back to Sign In</Link>
                </p>
            </div>

            <ResetPasswordModal
                isOpen={!!emailSent}
                email={emailSent ?? ""}
                onClose={() => setEmailSent(null)}
            />
        </>
    );
};
