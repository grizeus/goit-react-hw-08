import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

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
      toast.success("Success!");
      actions.resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
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
