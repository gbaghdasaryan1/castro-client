import { useAuthGuard } from "@features/auth/ProtectedRoute";
import { ProfilePage } from "@features/profile";

export default function ProfileDetails() {
  const isChecking = useAuthGuard();

  if (isChecking) {
    return null;
  }

  return <ProfilePage />;
}
