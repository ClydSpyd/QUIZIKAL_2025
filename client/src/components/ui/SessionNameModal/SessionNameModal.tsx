/* eslint-disable react-refresh/only-export-components */
import styles from "./SessionNameModal.module.scss";
import { forwardRef, useState } from "react";
import Modal from "../../utilityComps/Modal";

interface Props {
  handleConfirm: (sessionName: string) => void;
  handleClose: () => void;
}

const SessionNameModal = (
  { handleConfirm, handleClose }: Props,
  ref: React.Ref<ModalRef>
) => {
  const [nameInput, setNameInput] = useState<string>("");

  return (
    <Modal ref={ref}>
      <div className={`${styles.SessionNameModal}`}>
        <div className={`${styles.main}`}>
          <p className={`${styles.messageText}`}>Give your session a name</p>
          <div className={`${styles.inputWrapper}`}>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNameInput(e.target.value)
              }
            />
          </div>
        </div>
        <div className={`${styles.btns}`}>
          <button
            onClick={() => handleConfirm(nameInput)}
            className={`${styles.confirm}`}
          >
            Confirm
          </button>
          <button onClick={handleClose} className={`${styles.cancel}`}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(SessionNameModal);
