import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(state => selectContacts(state));
  const filter = useSelector(state => selectNameFilter(state));
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter)
  );

  return (
    <section title="Contact list">
      <ul className={css["contact-list"]}>
        {filteredContacts.map(({ id, name, number }) => (
          <Contact key={id} id={id} name={name} phone={number} />
        ))}
      </ul>
    </section>
  );
};

export default ContactList;
