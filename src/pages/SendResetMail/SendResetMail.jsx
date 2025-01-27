import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";

import PageTitle from "../../components/PageTitle/PageTitle";
import MainBtn from "../../components/MainBtn/MainBtn";
import { emailRegExp } from "../../constants";
import styles from "./SendResetMail.module.css";
import { resetEmail } from "../../redux/auth/operations";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegExp, "Email must be valid")
    .required("Email is required"),
});

const SendResetMail = () => {
  const emailID = useId();

  const dispatch = useDispatch();

  const handleResetMail = async (values, actions) => {
    try {
      await dispatch(resetEmail(values));
      toast.success("Email send successfully!");
    } catch (e) {
      toast.error(`Email send error: ${e}`);
    }
    actions.resetForm();
  };

  return (
    <section title="send password reset email">
      <PageTitle title="Reset password" />
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleResetMail}>
        <Form className={styles.form}>
          <label htmlFor={emailID}>Your email</label>
          <Field
            className={styles.input}
            type="text"
            name="email"
            placeholder="example@info.com"
            id={emailID}
          />
          <ErrorMessage
            className={styles.error}
            name="email"
            component="span"
          />
          <MainBtn className={styles.btn} type="submit">Reset password</MainBtn>
        </Form>
      </Formik>
    </section>
  );
};

export default SendResetMail;
