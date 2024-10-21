import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";

import { register } from "../../redux/auth/operations";
import styles from "./RegistrationForm.module.css";

const initialRegister = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(20, "Too long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(35, "Too long!")
    .required("Required"),
});

const RegistrationForm = () => {
  const nameID = useId();
  const emailID = useId();
  const passwordID = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    alert(JSON.stringify(values));
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialRegister}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      autoComplete="off">
      <Form autoComplete="off" className={styles.form}>
        <label htmlFor={nameID}>Name</label>
        <Field
          className={styles.input}
          type="text"
          name="name"
          placeholder="Thomas Anderson"
          id={nameID}
        />
        <ErrorMessage
          className={styles.error}
          name="name"
          component="span"
        />

        <label htmlFor={emailID}>Email</label>
        <Field
          className={styles.input}
          type="email"
          name="email"
          placeholder="example@example.com"
          id={emailID}
        />
        <ErrorMessage className={styles.error} name="email" component="span" />

        <label htmlFor={passwordID}>Password</label>
        <Field
          className={styles.input}
          type="password"
          name="password"
          id={passwordID}
        />
        <ErrorMessage
          className={styles.error}
          name="password"
          component="span"
        />
        <button className={styles["reg-btn"]} type="submit">
          Sign up
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
