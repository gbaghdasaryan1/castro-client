import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOTPVerify, useRegister } from "@features/auth/hooks";
import styles from "./register.module.scss";
import Link from "next/link";
import OtpModal from "@features/modal/components/OTPModal";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type FormData = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"personal" | "agency">("personal");

  const [openOTP, setOpenOTP] = useState(false);

  const {
    mutate: registerMutation,
    error: registrationError,
    isError: isRegistrationError,
    data: registrationData,
  } = useRegister();

  const { mutate: otpVerifyMutation, error: otpVerifyError } = useOTPVerify();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const emailValue = watch("email");

  const onSubmit = async (data: FormData) => {
    console.log("REGISTER DATA:", {
      ...data,
      role,
    });

    registerMutation(
      { ...data, role },
      {
        onSuccess: () => {
          setOpenOTP(true);
        },
      },
    );
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const handleVerify = (code: string) => {
    console.log("OTP:", code);

    otpVerifyMutation(
      { code, email: emailValue },
      {
        onSuccess(data, variables, onMutateResult, context) {
          localStorage.setItem("token", data?.accessToken!);
          setOpenOTP(false);
          router.push("/");
        },
        // onError: (err: Error) => setErrorOtp(err.message),
      },
    );
    // API CALL
    // await axios.post("/api/verify-otp", { code })

    // setOpenOTP(false);
  };

  return (
    <main className={styles.page}>
      {/* LEFT */}
      <section className={styles.left}>
        <div className={styles.overlay} />

        <div className={styles.leftContent}>
          <h1>Elevate your craft.</h1>
          <p>
            Join a global collective of elite artisans and discerning
            collectors.
          </p>
        </div>

        <div className={styles.blob} />
      </section>

      {/* RIGHT */}
      <section className={styles.right}>
        <div className={styles.card}>
          <h2>Create Account</h2>
          <p>Select your path to begin the journey.</p>

          {/* ROLE */}
          <div className={styles.roles}>
            <button
              type="button"
              className={role === "personal" ? styles.active : ""}
              onClick={() => setRole("personal")}
            >
              Personal
            </button>

            <button
              type="button"
              className={role === "agency" ? styles.active : ""}
              onClick={() => setRole("agency")}
            >
              Agency
            </button>
          </div>
          {isRegistrationError && (
            <div className={styles.error}>{registrationError?.message}</div>
          )}

          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First Name is too short",
                },
              })}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}

            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last Name is too short",
                },
              })}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}

            {/* EMAIL */}
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
                  minLength: {
                    value: 8,
                    message: "Min 8 characters",
                  },
                })}
              />

              <button
                className={styles.passwordButton}
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

          <button
            type="button"
            className={styles.googleButton}
            onClick={handleGoogleSignUp}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>

          <p className={styles.footer}>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>

          <p className={styles.terms}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <OtpModal
          errorOtp={otpVerifyError?.message}
          isOpen={openOTP}
          onClose={() => setOpenOTP(false)}
          onSubmit={handleVerify}
        />
      </section>
    </main>
  );
};

export default RegisterPage;
