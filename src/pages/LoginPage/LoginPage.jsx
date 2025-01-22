import { Toaster } from "react-hot-toast";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section title="login page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title="Log in" />
      <p className={styles.remark}>*If you already registered, don&#39;t forget to verify your email address</p>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
