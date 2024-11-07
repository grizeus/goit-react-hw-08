import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addContact } from "../../redux/contacts/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";

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
  const formID = useId();
  const nameID = useId();
  const numberID = useId();

  return (
    <CustomForm
      onSubmit={addContact}
      initialValues={initialContact}
      validationSchema={validationSchema}
      type="addContact"
      btnName="Add contact"
      id={formID}>
      <label htmlFor={nameID}>Name</label>
      <Field
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        id={nameID}
      />
      <ErrorMessage className={styles.error} name="name" component="span" />

      <label htmlFor={numberID}>Phone number</label>
      <Field
        className={styles.input}
        type="text"
        name="number"
        placeholder="+38-XXX-XXX-XX-XX"
        id={numberID}
      />
      <ErrorMessage className={styles.error} name="number" component="span" />
    </CustomForm>
  );
};

export default ContactForm;
