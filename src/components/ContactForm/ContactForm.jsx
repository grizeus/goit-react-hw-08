import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import nextId from "react-id-generator";

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

const ContactForm = ({ onAdd }) => {
  const nameID = useId();
  const numberID = useId();

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nextId(),
      ...values,
    });
    actions.reset();
  };

  return (
    <Formik
      initialValues={initialContact}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label htmlFor={nameID}>Name</label>
        <Field type="text" name="name" placeholder="..." id={nameID} />
        <ErrorMessage name="name" component="span" />

        <label htmlFor={numberID}>Phone number</label>
        <Field type="text" name="number" placeholder="..." id={numberID} />
        <ErrorMessage name="number" component="span" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
