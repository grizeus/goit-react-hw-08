import { Toaster } from "react-hot-toast";

import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section title="login page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1 className={styles.title}>Log in</h1>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
