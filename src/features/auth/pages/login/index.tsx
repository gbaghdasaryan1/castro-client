import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import axios from "axios";
import Link from "next/link";
import { LoginFormData } from "@features/auth/types";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/login", data);

      console.log("LOGIN SUCCESS:", res.data);

      localStorage.setItem("token", res.data.token);
    } catch (err: any) {
      console.error("LOGIN ERROR:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={`${styles.blur} ${styles["blur-left"]}`} />
        <div className={`${styles.blur} ${styles["blur-right"]}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.branding}>
          <h1>Castro</h1>
          <p>ESTABLISHED FOR CREATORS</p>
        </div>

        <div className={styles.glassCard}>
          <header className={styles.header}>
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div className={styles.field}>
              <label>EMAIL ADDRESS</label>

              <input
                type="email"
                placeholder="artist@castro.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email",
                  },
                })}
              />

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            {/* PASSWORD */}
            <div className={styles.field}>
              <div className={styles.fieldTop}>
                <label>PASSWORD</label>
                <a href="#">FORGOT PASSWORD?</a>
              </div>

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
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            {/* SUBMIT */}

            <p className={styles.footer}>
              Don’t have an account? <Link href="/register">Sign Up</Link>
            </p>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "LOADING..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
