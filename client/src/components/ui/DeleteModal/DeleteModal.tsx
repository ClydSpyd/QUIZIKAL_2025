/* eslint-disable react-refresh/only-export-components */
import styles from "./DeleteModal.module.scss";
import { AiOutlineWarning } from "react-icons/ai";
import { forwardRef } from "react";
import Modal from "../../utilityComps/Modal";

interface Props {
  handleConfirm: () => void;
  handleClose: () => void;
  title: string;
  deleteError?: boolean;
}

const DeleteModal = (
  { handleConfirm, handleClose, title, deleteError }: Props,
  ref: React.Ref<ModalRef>
) => {

  return (
    <Modal ref={ref}>
      <div className={`${styles.deleteModalWrapper}`}>
        <>
          <AiOutlineWarning size={40} />
          {!deleteError ? (
            <>
              <p className={`${styles.messageText}`}>
                Delete <span>{title}</span> permanently?
              </p>
              <div className={`${styles.btns}`}>
                <button onClick={handleConfirm} className={`${styles.confirm}`}>
                  Confirm
                </button>
                <button onClick={handleClose} className={`${styles.cancel}`}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Somthing went wrong</p>
              <button onClick={handleClose} className={`${styles.cancel}`}>
                Close
              </button>
            </>
          )}
        </>
      </div>
    </Modal>
  );
};

export default forwardRef(DeleteModal);
