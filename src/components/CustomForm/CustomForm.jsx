import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";

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
    } catch (error) {
      console.log(error);
    } finally {
      actions.resetForm();
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
        <button className={styles.btn} type="submit">
          {btnName}
        </button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
