import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";

function App() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <Loader />}
      {error && <Error message={error} />}
      <ContactList />
    </div>
  );
}

export default App;
