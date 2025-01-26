/* eslint-disable react-refresh/only-export-components */
import styles from "./CreateSessionModal.module.scss";
import { forwardRef, useState } from "react";
import Modal from "../../utilityComps/Modal";
import { API } from "@/api";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

interface Props {
  handleClose: () => void;
  quizId:string;
}

const CreateSessionModal = (
  { handleClose, quizId }: Props,
  ref: React.Ref<ModalRef>
) => {
  const [nameInput, setNameInput] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { data: sessionCode, error } = await API.session.createSession(
      user!.id,
      quizId,
      nameInput
    );
    if(sessionCode){
        navigate(`/host/${sessionCode}`);
    }
    console.log({ error });
  };

  return (
    <Modal ref={ref}>
      <div className={`${styles.createSessionModal}`}>
        <div className={`${styles.row}`}>
          <p className={`${styles.rowTitle}`}>Session name</p>
          <div className={`${styles.inputWrapper}`}>
            <input
              autoFocus
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNameInput(e.target.value)
              }
            />
          </div>
        </div>
        <div className={`${styles.btns}`}>
          <button
            onClick={handleSubmit}
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

export default forwardRef(CreateSessionModal);
