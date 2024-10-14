import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

import { fetchContacts } from "../../redux/contactsOps";
import { selectError, selectIsLoading } from "../../redux/selectors";

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
