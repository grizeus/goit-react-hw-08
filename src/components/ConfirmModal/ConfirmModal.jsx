import ReactModal from "react-modal";
import clsx from "clsx";

import styles from "./ConfirmModal.module.css";

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
          <button className={clsx(styles.btn, styles["btn-confirm"])} type="submit" onClick={actionCallback}>
            Confirm
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              setIsModalOpen(false);
            }}>
            Reject
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;
