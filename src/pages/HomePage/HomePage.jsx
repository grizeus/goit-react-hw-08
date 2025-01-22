import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactForm from "../../components/ContactForm/ContactForm";

const HomePage = () => {
  const user = useSelector(selectUser);
  const isLogged = useSelector(selectIsLoggedIn);
  const userName = user.name !== null ? user.name : "stranger";
  return (
    <section title="home page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title={`Welcome, ${userName}!`} />
      {isLogged && <ContactForm />}
    </section>
  );
};

export default HomePage;
