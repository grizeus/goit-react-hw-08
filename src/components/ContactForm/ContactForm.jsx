import { useId } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

import css from "./ContactForm.module.css";

const initialContact = {
  name: "",
  number: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  number: Yup.string()
    .min(5, "Too short!")
    .max(13, "Too long!")
    .required("Required"),
});

const ContactForm = () => {
  const nameID = useId();
  const numberID = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <section title="Create contact form">
      <h1>Phonebook</h1>
      <Formik
        initialValues={initialContact}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label htmlFor={nameID}>Name</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="..."
            id={nameID}
          />
          <ErrorMessage className={css.error} name="name" component="span" />

          <label htmlFor={numberID}>Phone number</label>
          <Field
            className={css.input}
            type="text"
            name="number"
            placeholder="..."
            id={numberID}
          />
          <ErrorMessage className={css.error} name="number" component="span" />
          <button className={css["contact-btn"]} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default ContactForm;
