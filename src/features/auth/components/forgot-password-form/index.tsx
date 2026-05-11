import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styles from "./forgotPasswordForm.module.scss";
import { ForgotPasswordBody } from "@features/auth/types";
import { useForgotPassword } from "@features/auth/hooks";
import { ResetPasswordModal } from "@features/modal/components/ResetPasswordModal";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";

export const ForgotPasswordForm: FC = () => {
    const [emailSent, setEmailSent] = useState<string | null>(null);
    const { mutate: forgotMutate, isPending, error, isError } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordBody>();

    const onSubmit = (data: ForgotPasswordBody) => {
        forgotMutate(data.email, {
            onSuccess: () => setEmailSent(data.email),
        });
    };

    return (
        <>
            <div className={styles.glassCard}>
                <header className={styles.header}>
                    <h2>Forgot Password</h2>
                    <p>Enter your email and we&apos;ll send you a reset code.</p>
                </header>

                {isError && <div className={styles.errorBanner}>{error.message}</div>}

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

                    <Button
                        type="submit"
                        fullWidth
                        loading={isPending}
                    >
                        Send Reset Code
                    </Button>
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
