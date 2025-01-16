import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdPerson, MdPhone } from "react-icons/md";
import toast from "react-hot-toast";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import {
  deleteContact,
  updateContactEmail,
  updateContactName,
  updateContactPhoneNumber,
} from "../../redux/contacts/operations";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import EditableField from "../EditableField/EditableField";
import styles from "./Contact.module.css";

const Contact = ({ id, name, phoneNumber, email, contactType, isFavourite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted!");
      })
      .catch(e => {
        console.log(e.message);
        toast.error(e.message);
      });
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
          text={phoneNumber}
          field={"phoneNumber"}
          placeholder="Phone number"
          operation={updateContactPhoneNumber}
        />
      </div>
      <div className={styles["contact-classname"]}>
        <EditableField
          id={id}
          text={email}
          field={"email"}
          placeholder="E-mail"
          operation={updateContactEmail}
        />
      </div>
      <div className={styles["contact-classname"]}>
        {/* need to update with icon or something */}
        <EditableField
          id={id}
          text={isFavourite ? "hommie" : "nah"}
          placeholder="Is favorite"
        />
      </div>
      <div className={styles["contact-classname"]}>
        <EditableField id={id} text={contactType} placeholder="Contact type" />
      </div>
      <SecondaryBtn
        actionType="warning"
        isBroad={true}
        onClick={() => setIsModalOpen(true)}>
        Delete
      </SecondaryBtn>
      {isModalOpen && (
        <ConfirmModal
          actionCallback={handleDelete}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Contact;
