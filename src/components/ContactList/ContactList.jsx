import { useSelector } from "react-redux";

import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/selectors";

import styles from "./ContactList.module.css";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <section title="Contact list">
      {Array.isArray(filteredContacts) && filteredContacts.length > 0 ? (
        <ul className={styles["contact-list"]}>
          {filteredContacts.map(({ id, name, number }) => (
            <li key={id}>
              <Contact id={id} name={name} number={number} />
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.notification}>No contacts in your phonebook yet</span>
      )}
    </section>
  );
};

export default ContactList;
