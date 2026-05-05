import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.scss";
import Link from "next/link";
import OtpModal from "@features/modal/components/OTPModal";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"creator" | "agency">("creator");
  const [openOTP, setOpenOTP] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("REGISTER DATA:", {
      ...data,
      role,
    });
    try {
      setOpenOTP(true);
    } catch (error) {}

    // example API call
    // await axios.post("/api/register", { ...data, role });
  };

  const handleVerify = (code: string) => {
    console.log("OTP:", code);

    // API CALL
    // await axios.post("/api/verify-otp", { code })

    setOpenOTP(false);
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
              className={role === "creator" ? styles.active : ""}
              onClick={() => setRole("creator")}
            >
              Creator
            </button>

            <button
              type="button"
              className={role === "agency" ? styles.active : ""}
              onClick={() => setRole("agency")}
            >
              Agency
            </button>
          </div>

          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <input
              placeholder="Full Name"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name is too short",
                },
              })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
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
                    value: 6,
                    message: "Min 6 characters",
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

          <p className={styles.footer}>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>

          <p className={styles.terms}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <OtpModal
          isOpen={openOTP}
          onClose={() => setOpenOTP(false)}
          onSubmit={handleVerify}
        />
      </section>
    </main>
  );
};

export default RegisterPage;
