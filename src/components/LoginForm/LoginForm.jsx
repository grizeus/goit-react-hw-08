import * as Yup from "yup";
import { ErrorMessage, Field } from "formik";
import { useId } from "react";

import { logIn } from "../../redux/auth/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";

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
  const formID = useId();
  const emailID = useId();
  const passwordID = useId();

  return (
    <CustomForm
      onSubmit={logIn}
      initialValues={initialLogin}
      validationSchema={validationSchema}
      type="login"
      btnName="Log In"
      id={formID}>
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
      <ErrorMessage className={styles.error} name="password" component="span" />
    </CustomForm>
  );
};

export default LoginForm;
