import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <section title="Contact list">
      <ul className={css["contact-list"]}>
        {contacts.map(({ id, name, number }) => (
          <Contact
            key={id}
            id={id}
            name={name}
            phone={number}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default ContactList;
