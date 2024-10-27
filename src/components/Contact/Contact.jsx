import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdPerson, MdPhone } from "react-icons/md";
import toast from "react-hot-toast";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import {
  deleteContact,
  updateContactName,
  updateContactNumber,
} from "../../redux/contacts/operations";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import EditableField from "../EditableField/EditableField";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    try {
      dispatch(deleteContact(id));
      toast.success("Contact deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={styles.contact}>
      <div className={styles["contact-content"]}>
        <MdPerson className={styles.icon} />
        <EditableField
          id={id}
          text={name}
          field="name"
          placeholder="Name"
          operation={updateContactName}
          className={styles["contact-name"]}
        />
      </div>
      <div className={styles["contact-content"]}>
        <MdPhone className={styles.icon} />
        <EditableField
          id={id}
          text={number}
          field={"number"}
          placeholder="Phone number"
          operation={updateContactNumber}
        />
      </div>
      <SecondaryBtn
        actionType="warning"
        isBroad={true}
        onClick={() => setIsModalOpen(true)}>
        Delete
      </SecondaryBtn>
      <ConfirmModal
        actionCallback={handleDelete}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Contact;
