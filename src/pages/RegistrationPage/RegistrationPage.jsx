import { Toaster } from "react-hot-toast";

import PageTitle from "../../components/PageTitle/PageTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <section title="registration page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title="Registration" />
      <RegistrationForm />
    </section>
  );
};

export default RegistrationPage;
