import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({id, name, number}) => (
        <Contact
          key={id}
          id={id}
          name={name}
          phone={number}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ContactList;
