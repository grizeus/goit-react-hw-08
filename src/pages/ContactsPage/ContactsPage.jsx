import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { Toaster } from "react-hot-toast";
import PageTitle from "../../components/PageTitle/PageTitle";

const ContactsPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <section title="contacts page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageTitle title="Phone book" />
      <SearchBox />
      {isLoading && !error && <Loader />}
      {error && <Error message={error} />}
      <ContactList />
    </section>
  );
};

export default ContactsPage;
