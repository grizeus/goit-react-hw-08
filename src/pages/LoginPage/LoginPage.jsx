import { Toaster } from "react-hot-toast";

import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";

const LoginPage = () => {
  return (
    <section title="login page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title="Log in" />
      <LoginForm />
    </section>
  );
};

export default LoginPage;
