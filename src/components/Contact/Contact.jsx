import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import toast from "react-hot-toast";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { deleteContact, updateField } from "../../redux/contacts/operations";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import EditableField from "../EditableField/EditableField";
import styles from "./Contact.module.css";
import defaultPic from "../../assets/avatar-default.png"

const Contact = ({
  id,
  name,
  phoneNumber,
  email,
  contactType,
  isFavourite,
  contactPic,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted!");
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  const handleLike = () => {
    dispatch(updateField({ id, field: "isFavourite", value: !isFavourite }))
      .unwrap()
      .then()
      .catch(e => {
        toast.error(e);
      });
  };

  return (
    <div className={styles.contact}>
      <div className={styles.wrap}>
        <img className={styles.avatar} src={
        contactPic ? contactPic : defaultPic} alt="Contact avatar" />
      </div>
      <div className={styles["contact-content"]}>
        <MdPerson className={styles.icon} />
        <EditableField
          id={id}
          text={name}
          field={"name"}
          placeholder="Name"
          operation={updateField}
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
          operation={updateField}
        />
      </div>
      <div className={styles["contact-content"]}>
        <EditableField
          id={id}
          text={email}
          field={"email"}
          placeholder="E-mail"
          operation={updateField}
        />
      </div>
      <div>
        {/* TODO: need to select tag here */}
        <EditableField
          id={id}
          text={contactType}
          field={"contactType"}
          placeholder="Contact type"
          operation={updateField}
        />
      </div>
      <button type="submit" onClick={handleLike} className={styles.favBtn}>
        {isFavourite ? (
          <MdOutlineStarPurple500 className={styles.favIcon} />
        ) : (
          <MdOutlineStarOutline className={styles.favIcon} />
        )}
      </button>
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
