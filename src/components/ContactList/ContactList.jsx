import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/selectors";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

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
