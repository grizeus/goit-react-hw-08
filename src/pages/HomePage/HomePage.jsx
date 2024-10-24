import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import ContactForm from "../../components/ContactForm/ContactForm";
import { selectUser } from "../../redux/auth/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";

const HomePage = () => {
  const user = useSelector(selectUser);
  const userName = user.name !== null ? user.name : "stranger";
  return (
    <section title="home page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title={`Welcome, ${userName}!`} />
      {user.name !== null && <ContactForm />}
    </section>
  );
};

export default HomePage;
