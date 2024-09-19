// import css from './App.module.css'
import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import initialContacts from "../../data/contacts.json";

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");

  const deleteContact = (contactID) => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactID);
    });
  };

  const addContact = (newContact) => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={search} onFilter={setSearch} />
      <ContactList contacts={filteredContacts} handleDelete={deleteContact} />
    </div>
  );
}

export default App;
