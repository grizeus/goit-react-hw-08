import { useDispatch, useSelector } from "react-redux";
import { PiAddressBookFill } from "react-icons/pi";
import { useEffect } from "react";

import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import ContactList from "../../components/ContactList/ContactList";
import { refreshUser } from "../../redux/auth/operations";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectError,
  selectIsLoading,
  selectPaginationData,
} from "../../redux/contacts/selectors";
import { Toaster } from "react-hot-toast";
import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { page, totalPages, perPage, sortBy, sortOrder } =
    useSelector(selectPaginationData);

  useEffect(() => {
    // ask every 5 sec on authorization error
    const interval = setInterval(async () => {
      if (error) {
        if (error.includes("401")) {
          dispatch(refreshUser());
        }
      }
    }, 5000);
    dispatch(fetchContacts({ page, totalPages, perPage, sortBy, sortOrder }));
    return () => clearInterval(interval);
  }, [dispatch, page, totalPages, perPage, sortBy, sortOrder, error]);
  return (
    <section title="contacts page">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className={styles["title-block"]}>
        <PiAddressBookFill className={styles.icon} />
        <PageTitle title="Phone book" />
      </div>
      <SearchBox />
      {isLoading && !error && <Loader />}
      {error && <Error message={error} />}
      <ContactList />
      {totalPages > 1 && <Pagination />}
    </section>
  );
};

export default ContactsPage;
