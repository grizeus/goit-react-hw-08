import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";

import MainButton from "../MainBtn/MainBtn";
import styles from "./CustomForm.module.css";

const CustomForm = ({
  onSubmit,
  initialValues,
  validationSchema,
  btnName,
  children,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    try {
      dispatch(onSubmit(values));
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      autoComplete="off">
      <Form autoComplete="off" className={styles.form}>
        {children}
        <MainButton>{btnName}</MainButton>
      </Form>
    </Formik>
  );
};

export default CustomForm;
