import css from "./Contact.module.css";
import { MdPerson, MdPhone } from "react-icons/md";

const Contact = ({ id, name, phone, handleDelete }) => {
  return (
    <div className={css.contact}>
      <h3 className={css["contact-content"]}>
        {" "}
        <MdPerson className={css.icon} /> {name}
      </h3>
      <p className={css["contact-content"]}>
        {" "}
        <MdPhone className={css.icon} /> {phone}
      </p>
      <button className={css["contact-btn"]} onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
