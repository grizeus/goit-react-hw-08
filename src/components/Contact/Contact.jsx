import css from "./Contact.module.css";

const Contact = ({ id, name, phone, handleDelete }) => {
  return (
    <div className={css.contact}>
      <h2>{name}</h2>
      <p>{phone}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default Contact;
