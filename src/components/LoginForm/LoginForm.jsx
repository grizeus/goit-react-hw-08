import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";

import { logIn } from "../../redux/auth/operations";
import styles from "./LoginForm.module.css";

const initialLogin = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(35, "Too long!")
    .required("Required"),
});

const LoginForm = () => {
  const emailID = useId();
  const passwordID = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("Login successful!");
      })
      .catch(e => {
        console.log("Login failed!", e.message);
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialLogin}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form autoComplete="off" className={styles.form}>
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
        <button className={styles["login-btn"]} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
