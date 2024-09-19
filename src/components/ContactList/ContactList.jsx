import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <div className={css.contactList}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          phone={contact.number}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
