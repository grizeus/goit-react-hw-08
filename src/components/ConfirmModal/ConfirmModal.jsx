import ReactModal from "react-modal";

import styles from "./ConfirmModal.module.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const afterOpenModal = () => {
  document.body.style.overflow = "hidden";
};

const afterCloseModal = () => {
  document.body.style.overflow = "auto";
};

const ConfirmModal = ({ actionCallback, isModalOpen, setIsModalOpen }) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <ReactModal
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleClose}
      onAfterClose={afterCloseModal}
      className={styles.modal}
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.65)" } }}
      contentLabel="Confirm Modal"
      closeTimeoutMS={200}>
      <div className={styles["modal-content"]}>
        <h4 className={styles.title}>Are you sure?</h4>
        <div className={styles["btn-block"]}>
          <SecondaryBtn
            actionType="warning"
            isBroad={true}
            onClick={actionCallback}>
            Confirm
          </SecondaryBtn>
          <SecondaryBtn
            actionType="accept"
            isBroad={true}
            onClick={() => {
              setIsModalOpen(false);
            }}>
            Reject
          </SecondaryBtn>
        </div>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;
