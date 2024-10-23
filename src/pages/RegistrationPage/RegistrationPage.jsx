import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <section title="registration page">
      <h1 className={styles.title}>Registration</h1>
      <RegistrationForm />
    </section>
  );
};

export default RegistrationPage;
