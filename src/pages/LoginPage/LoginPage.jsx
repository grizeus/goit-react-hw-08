import { Toaster } from "react-hot-toast";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;