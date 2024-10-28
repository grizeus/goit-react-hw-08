import * as Yup from "yup";
import { ErrorMessage, Field } from "formik";
import { useId } from "react";

import { register } from "../../redux/auth/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";

const initialRegister = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const RegistrationForm = () => {
  const formID = useId();
  const nameID = useId();
  const emailID = useId();
  const passwordID = useId();
  const confirmPasswordID = useId();

  return (
    <CustomForm
      onSubmit={register}
      initialValues={initialRegister}
      validationSchema={validationSchema}
      btnName="Sign up"
      id={formID}>
      <label htmlFor={nameID}>Name</label>
      <Field
        className={styles.input}
        type="text"
        name="name"
        placeholder="Thomas Anderson"
        id={nameID}
      />
      <ErrorMessage className={styles.error} name="name" component="span" />

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

      <label htmlFor={confirmPasswordID}>Confirm password</label>
      <Field
        className={styles.input}
        type="password"
        name="confirmPassword"
        id={confirmPasswordID}
      />
      <ErrorMessage className={styles.error} name="confirmPassword" component="span" />
    </CustomForm>
  );
};

export default RegistrationForm;
