import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdPerson, MdPhone } from "react-icons/md";
import toast from "react-hot-toast";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const Contact = ({ id, name, phone }) => {
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
    <div className={css.contact}>
      <h3 className={css["contact-content"]}>
        {" "}
        <MdPerson className={css.icon} /> {name}
      </h3>
      <p className={css["contact-content"]}>
        {" "}
        <MdPhone className={css.icon} /> {phone}
      </p>
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
