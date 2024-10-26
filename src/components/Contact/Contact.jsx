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
import Editable from "../Editable/Editable";
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
        <Editable
          text={name}
          placeholder="Name"
          className={styles["contact-name"]}>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => {
              dispatch(updateContactName({ id, name: e.target.value }));
            }}
          />
        </Editable>
      </div>
      <div className={styles["contact-content"]}>
        <MdPhone className={styles.icon} />
        <Editable text={number} placeholder="Phone number">
          <input
            className={styles.input}
            name="phone"
            type="text"
            placeholder="Phone number"
            value={number}
            onChange={e => {
              dispatch(updateContactNumber({ id, number: e.target.value }));
            }}
          />
        </Editable>
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
