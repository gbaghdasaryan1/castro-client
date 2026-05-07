import { useEffect } from "react";
import { useRouter } from "next/router";

const GoogleCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { token, error } = router.query;

    if (token && typeof token === "string") {
      localStorage.setItem("token", token);
      router.replace("/");
    } else if (error) {
      router.replace(`/login?error=${error}`);
    }
  }, [router.isReady, router.query]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p>Signing in...</p>
    </div>
  );
};

export default GoogleCallbackPage;
