import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";
import { selectUser } from "../../redux/auth/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";

const HomePage = () => {
  const user = useSelector(selectUser);
  return (
    <section title="home page">
      <h1 className={styles.title}>
        Welcome {user.name !== null ? user.name : "stranger"} to Home Page
      </h1>
      {user.name !== null && <ContactForm />}
    </section>
  );
};

export default HomePage;
