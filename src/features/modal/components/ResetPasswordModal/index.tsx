import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Modal from "../Modal";
import styles from "./resetPasswordModal.module.scss";
import { useResetPassword } from "@features/auth/hooks";
import { Input } from "@shared/ui/input";

type Props = {
    isOpen: boolean;
    email: string;
    onClose: () => void;
};

type ResetFormData = {
    newPassword: string;
    confirmPassword: string;
};

const ResetPasswordModal = ({ isOpen, email, onClose }: Props) => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState<string | null>(null);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const { mutate: resetMutate, isPending } = useResetPassword();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ResetFormData>();

    const newPassword = watch("newPassword");

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        }
    }, [isOpen]);

    const handleClose = () => {
        setOtp(["", "", "", "", "", ""]);
        setOtpError(null);
        reset();
        onClose();
    };

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const value = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(value)) return;
        const newOtp = [...otp];
        value.split("").forEach((d, i) => { newOtp[i] = d; });
        setOtp(newOtp);
    };

    const onSubmit = (data: ResetFormData) => {
        const code = otp.join("");
        if (code.length < 6) {
            setOtpError("Please enter the 6-digit code");
            return;
        }
        setOtpError(null);
        resetMutate(
            { email, newPassword: data.newPassword, code },
            {
                onSuccess: () => {
                    handleClose();
                    router.push("/login");
                },
                onError: (err: Error) => setOtpError(err.message),
            }
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className={styles.wrapper}>
                <h2>Reset Password</h2>
                <p>
                    Enter the 6-digit code sent to <strong>{email}</strong> and choose
                    a new password.
                </p>

                <div className={styles.otpInputs}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => { inputsRef.current[i] = el; }}
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleOtpChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                            inputMode="numeric"
                        />
                    ))}
                </div>

                {otpError && <div className={styles.error}>{otpError}</div>}

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="password"
                        placeholder="New Password"
                        error={errors.newPassword?.message}
                        {...register("newPassword", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Min 8 characters" },
                        })}
                    />

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (v) => v === newPassword || "Passwords do not match",
                        })}
                    />

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isPending}
                    >
                        {isPending ? "..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ResetPasswordModal;
