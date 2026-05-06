import { withTranslations } from "@/lib/withTranslations";
import { LoginPage } from "@features/auth";

export const getServerSideProps = withTranslations(['auth', 'common']);

const Login = () => {
  return <LoginPage />;
};

export default Login;
