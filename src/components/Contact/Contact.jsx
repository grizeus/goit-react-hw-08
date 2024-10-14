import { useDispatch } from "react-redux";
import { MdPerson, MdPhone } from "react-icons/md";

import { deleteContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";

const Contact = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

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
      <button className={css["contact-btn"]} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
