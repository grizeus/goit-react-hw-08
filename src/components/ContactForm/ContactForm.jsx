import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addContact } from "../../redux/contacts/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";

const initialContact = {
  name: "",
  phoneNumber: "",
  contactType: "",
};

const emailRegExp =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
    .required("Chose from: work, personal, home"),
  email: Yup.string().matches(emailRegExp, "Email must be valid")
});

const ContactForm = () => {
  const formID = useId();
  const nameID = useId();
  const numberID = useId();
  const typeID = useId();
  const emailID = useId();

  return (
    <CustomForm
      onSubmit={addContact}
      initialValues={initialContact}
      validationSchema={validationSchema}
      type="addContact"
      btnName="Add contact"
      id={formID}>
      <label htmlFor={nameID}>Name*</label>
      <Field
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        id={nameID}
      />
      <ErrorMessage className={styles.error} name="name" component="span" />

      <label htmlFor={numberID}>Phone number*</label>
      <Field
        className={styles.input}
        type="text"
        name="phoneNumber"
        placeholder="+38-XXX-XXX-XX-XX"
        id={numberID}
      />
      <label htmlFor={typeID}>Contact type*</label>
      <Field
        as="select"
        className={styles.input}
        name="contactType"
        id={typeID}>
        <option value="">Select a contact type</option>
        <option value="home">home</option>
        <option value="personal">personal</option>
        <option value="work">work</option>
      </Field>
      <label htmlFor={emailID}>E-mail</label>
      <Field
        className={styles.input}
        type="text"
        name="email"
        placeholder="example@info.com"
        id={emailID}
      />
      <ErrorMessage className={styles.error} name="number" component="span" />
    </CustomForm>
  );
};

export default ContactForm;
