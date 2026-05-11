import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleAuthBtn } from "@shared/components/GoogeAuthBtn";
import { RegistrationFormData } from "@features/auth/types";
import OtpModal from "@features/modal/components/OTPModal";
import { useOTPVerify, useRegister } from "@features/auth/hooks";
import styles from "./registerForm.module.scss";
import { RoleSelector } from "../role-selector";


const RegisterForm: FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"personal" | "agency">("personal");
    const [openOTP, setOpenOTP] = useState(false);
    const { mutate: otpVerifyMutation, error: otpVerifyError } = useOTPVerify();

    const {
        mutate: registerMutation,
        error: registrationError,
        isError: isRegistrationError,
    } = useRegister();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormData>();

    const emailValue = watch("email");

    const onSubmit = async (data: RegistrationFormData) => {
        registerMutation(
            { ...data, role },
            { onSuccess: () => setOpenOTP(true) },
        );
    };

    const handleVerify = (code: string) => {
        otpVerifyMutation(
            { code, email: emailValue },
            {
                onSuccess(data) {
                    localStorage.setItem("token", data.accessToken);
                    setOpenOTP(false);
                    router.push("/");
                },
            },
        );
    };

    return (
        <div className={styles.card}>
            <h2>Create Account</h2>
            <p>Select your path to begin the journey.</p>

            <RoleSelector role={role} onChange={setRole} />

            {isRegistrationError && (
                <div className={styles.error}>{registrationError?.message}</div>
            )}

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="First Name"
                    {...register("firstName", {
                        required: "First name is required",
                        minLength: { value: 2, message: "First Name is too short" },
                    })}
                />
                {errors.firstName && (
                    <span className={styles.error}>{errors.firstName.message}</span>
                )}

                <input
                    placeholder="Last Name"
                    {...register("lastName", {
                        required: "Last name is required",
                        minLength: { value: 2, message: "Last Name is too short" },
                    })}
                />
                {errors.lastName && (
                    <span className={styles.error}>{errors.lastName.message}</span>
                )}

                <input
                    placeholder="Email Address"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email format",
                        },
                    })}
                />
                {errors.email && (
                    <span className={styles.error}>{errors.email.message}</span>
                )}

                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Min 8 characters" },
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>
                {errors.password && (
                    <span className={styles.error}>{errors.password.message}</span>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Account"}
                </button>
            </form>

            <div className={styles.divider}>
                <span>or</span>
            </div>

            <GoogleAuthBtn />

            <p className={styles.footer}>
                Already have an account? <Link href="/login">Sign In</Link>
            </p>

            <p className={styles.terms}>
                By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            <OtpModal
                errorOtp={otpVerifyError?.message}
                isOpen={openOTP}
                onClose={() => setOpenOTP(false)}
                onSubmit={handleVerify}
            />
        </div>
    );
};

export default RegisterForm;
