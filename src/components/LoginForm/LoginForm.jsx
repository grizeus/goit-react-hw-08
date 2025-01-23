import * as Yup from "yup";
import { ErrorMessage, Field } from "formik";
import { useId } from "react";

import { logIn, getLoginOAuth } from "../../redux/auth/operations";
import CustomForm from "../CustomForm/CustomForm";
import styles from "../CustomForm/CustomForm.module.css";
import { useDispatch } from "react-redux";

const initialLogin = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(35, "Too long!")
    .required("Required"),
});

const LoginForm = () => {
  const formID = useId();
  const emailID = useId();
  const passwordID = useId();

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await dispatch(getLoginOAuth());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
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
        <ErrorMessage
          className={styles.error}
          name="password"
          component="span"
        />
      </CustomForm>
      <span className={styles.margin}>
        or
      </span>
      <button className={styles.gBtn} onClick={handleClick}>Login with Google</button>
    </>
  );
};

export default LoginForm;
