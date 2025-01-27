import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import PageTitle from "../../components/PageTitle/PageTitle";
import MainBtn from "../../components/MainBtn/MainBtn";
import styles from "./ResetPassword.module.css";
import { resetPwd } from "../../redux/auth/operations";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too short!")
    .max(35, "Too long!")
    .required("New password required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confiramtion password required!"),
});

const ResetPassword = () => {
  const passwordID = useId();
  const confirmPasswordID = useId();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordReset = async (values, actions) => {
    try {
      const token = searchParams.get("token");
      const { password } = values;
      await dispatch(resetPwd({ password, token }));
      toast.success("Password successfully updated!");
      navigate("/login");
    } catch (e) {
      toast.error(`Password updating error: ${e}`);
    }
    actions.resetForm();
  };

  return (
    <section title="send password reset email">
      <PageTitle title="Reset password" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePasswordReset}>
        <Form className={styles.form}>
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

          <label htmlFor={confirmPasswordID}>Confirm password</label>
          <Field
            className={styles.input}
            type="password"
            name="confirmPassword"
            id={confirmPasswordID}
          />
          <ErrorMessage
            className={styles.error}
            name="confirmPassword"
            component="span"
          />
          <MainBtn className={styles} type="submit">Reset password</MainBtn>
        </Form>
      </Formik>
    </section>
  );
};

export default ResetPassword;
