import { useAuthGuard } from "@/features/auth/ProtectedRoute";

export default function ProfileDetails() {
  const isChecking = useAuthGuard();

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return <div>Profile Details</div>;
}
