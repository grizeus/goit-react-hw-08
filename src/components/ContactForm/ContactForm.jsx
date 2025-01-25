import { useId, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { addContact } from "../../redux/contacts/operations";
import MainButton from "../MainBtn/MainBtn";
import styles from "../CustomForm/CustomForm.module.css";
import { useDispatch } from "react-redux";

const initialContact = {
  name: "",
  phoneNumber: "",
  contactType: "",
  photo: null,
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
  email: Yup.string().matches(emailRegExp, "Email must be valid"),
  photo: Yup.mixed()
    .nullable()
    .test("isFile", "Please select an image file", value => {
      if (!value) return true;
      const type = value.type?.split("/")[0];
      return type === "image";
    }),
});

const ContactForm = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const formID = useId();
  const nameID = useId();
  const numberID = useId();
  const typeID = useId();
  const emailID = useId();
  const fileID = useId();

  const handleFileChange = e => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (values, actions) => {
    const formData = new FormData();
    if (file) {
      formData.append("photo", file);
    }
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photo") {
        formData.append(key, value);
      }
    });
    try {
      dispatch(addContact(formData));
    } catch (e) {
      console.log(e);
    }
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialContact}
      validationSchema={validationSchema}
      onSubmit={handleUpload}
      id={formID}>
      <Form autoComplete="off" className={styles.form}>
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
        <ErrorMessage
          className={styles.error}
          name="phoneNumber"
          component="span"
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
        <ErrorMessage
          className={styles.error}
          name="contactType"
          component="span"
        />

        <label htmlFor={emailID}>E-mail</label>
        <Field
          className={styles.input}
          type="text"
          name="email"
          placeholder="example@info.com"
          id={emailID}
        />
        <label htmlFor={fileID}>Contact picture</label>
        <Field
          className={styles.input}
          type="file"
          name="photo"
          id={fileID}
          onChange={handleFileChange}
        />
        <ErrorMessage className={styles.error} name="photo" component="span" />
        <MainButton type="submit">Add contact</MainButton>
      </Form>
    </Formik>
  );
};

export default ContactForm;
