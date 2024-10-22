import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import ContactForm from "../../components/ContactForm/ContactForm";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const user = useSelector(selectUser);
  return (
    <section title="home page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1 className={styles.title}>
        Welcome, {user.name !== null ? user.name : "stranger"}!
      </h1>
      {user.name !== null && <ContactForm />}
    </section>
  );
};

export default HomePage;
