import { useRef } from "react";
import styles from "./ImageUploader.module.scss";
import { MdOutlineUploadFile } from "react-icons/md";
import { ImLink } from "react-icons/im";
import Modal from "../utilityComps/Modal";
import LinkModal from "../LinkModal/LinkModal";
import { uploadImage } from "./ImageUploader.utilities";

interface Props {
  loading: boolean;
  toggleLoading: (val: boolean) => void;
  callback: (idx: number, url: string) => void;
  idx: number;
}
const EmptyState = ({ loading, toggleLoading, idx, callback }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ModalRef>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleLoading(true);
    uploadImage(e, idx, callback);
  };

  return (
    <>
      {!loading && (
        <>
          {/* <p className={`${styles.optionText}`}>Option {idx + 1}</p> */}
          <div className={`${styles.buttons}`}>
            <div
              className={`${styles.btn}`}
              onClick={() => modalRef.current?.open()}
            >
              <p>Link</p>
              <ImLink />
            </div>
            <div
              onClick={() => inputRef.current?.click()}
              className={`${styles.btn}`}
            >
              <p>File</p>
              <MdOutlineUploadFile className={`${styles.uploadIcon}`} />
              <input
                ref={inputRef}
                onChange={handleImage}
                type="file"
                accept=".jpg, .jpeg, .png, .gif"
                name="image"
              />
            </div>
          </div>
        </>
      )}

      <Modal ref={modalRef}>
        <LinkModal idx={idx} callback={callback} />
      </Modal>
    </>
  );
};

export default EmptyState;
