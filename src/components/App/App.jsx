// import css from './App.module.css'
import { useEffect, useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import initialContacts from "../../data/contacts.json";

function App() {
  // use nullish coalescing to check if the stored contacts exist
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("stored-contacts")) ??
      initialContacts
    );
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.localStorage.setItem("stored-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactID => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactID);
    });
  };

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <ContactForm onAdd={addContact} />
      <SearchBox value={search} onFilter={setSearch} />
      <ContactList contacts={filteredContacts} handleDelete={deleteContact} />
    </div>
  );
}

export default App;
