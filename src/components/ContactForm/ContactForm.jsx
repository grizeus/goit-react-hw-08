import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addContact } from "../../redux/contacts/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";

const initialContact = {
  name: "",
  phoneNumber: "",
  contactType: "personal",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(5, "Too short!")
    .max(13, "Too long!")
    .required("Phone number is required"),
  contactType: Yup.string()
    .oneOf(["work", "personal", "home"])
    .required("Choses from: work, personal, home"),
});

const ContactForm = () => {
  const formID = useId();
  const nameID = useId();
  const numberID = useId();
  const typeID = useId();

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
        name="phoneNumber"
        placeholder="+38-XXX-XXX-XX-XX"
        id={numberID}
      />
      <label htmlFor={typeID}>Contact type</label>
      <Field
        className={styles.input}
        type="text"
        name="contactType"
        placeholder="work, personal, home"
        id={typeID}
      />
      <ErrorMessage className={styles.error} name="number" component="span" />
    </CustomForm>
  );
};

export default ContactForm;
