import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { selectUser } from "../../redux/auth/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactForm from "../../components/ContactForm/ContactForm";

const HomePage = () => {
  const user = useSelector(selectUser);
  const userName = user.name !== null ? user.name : "stranger";
  return (
    <section title="home page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title={`Welcome, ${userName}!`} />
      <ContactForm />
    </section>
  );
};

export default HomePage;
