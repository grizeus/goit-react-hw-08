import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

import MainButton from "../MainBtn/MainBtn";
import styles from "./CustomForm.module.css";

const CustomForm = ({
  onSubmit,
  initialValues,
  validationSchema,
  type,
  btnName,
  children,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(onSubmit(values))
      .unwrap()
      .then(() => {
        if (type === "addContact") {
          toast.success("Contact added!");
        } else {
          toast.success(`Success ${type}!`);
        }
      })
      .catch(() => {
        toast.error(`${type.toUpper()} error!`);
      });
    actions.resetForm();
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
