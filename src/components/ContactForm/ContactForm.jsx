import { useId, useState } from "react";
import toast from "react-hot-toast";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { addContact } from "../../redux/contacts/operations";
import MainButton from "../MainBtn/MainBtn";
import styles from "../CustomForm/CustomForm.module.css";
import { useDispatch } from "react-redux";
import { emailRegExp } from "../../constants/index";

const initialContact = {
  name: "",
  phoneNumber: "",
  contactType: "",
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
    if (file !== null) {
      formData.append("photo", file);
    }
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photo") {
        formData.append(key, value);
      }
    });
    try {
      await dispatch(addContact(formData));
      toast.success("Contact added");
    } catch (e) {
      toast.error(`Contact adding error: ${e.message}`);
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
