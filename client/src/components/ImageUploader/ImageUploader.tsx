import styles from "./ImageUploader.module.scss";
import { useEffect, useRef, useState } from "react";
import Modal from "../utilityComps/Modal";
import LinkModal from "../LinkModal/LinkModal";
import loader from "assets/loaders/spin_orange.svg";
import EmptyState from "./EmptyState";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  idx: number;
  callback: (idx: number, url: string) => void;
  setCorrect: ((idx: number) => void) | undefined;
  currentValue: string;
  isCorrectOption: boolean;
}
const ImageUploader = (props: Props) => {
  const { currentValue, idx, callback, setCorrect, isCorrectOption } = props;
  const [loading, toggleLoading] = useState<boolean>(false);
  const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (currentValue) toggleLoading(true);
  }, [currentValue]);

  const confState = !!setCorrect

  const handleImgClick = () => {
    if(!confState) return;
    setCorrect(idx)
  }
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    callback(idx, "");
    setCorrect?.(-1)
  }

  return (
    <>
      <div className={`${styles.uploaderWrapper}`}>
        {!currentValue ? (
          <EmptyState
            loading={loading}
            toggleLoading={toggleLoading}
            {...props}
          />
        ) : (
          <div
            className={`${styles.imageWrapper} ${
              isCorrectOption && styles.isCorrect
            } ${confState && styles.confirmState}`}
            onClick={handleImgClick}
          >
            {isCorrectOption && (
              <div className={`${styles.correctDiv}`}>CORRECT</div>
            )}
            <div className={`${styles.deleteWrapper}`} onClick={handleDelete}>
              <MdDeleteForever />
            </div>
            <img
              onLoad={() => toggleLoading(false)}
              className={`${styles.optionImage}`}
              src={currentValue}
              alt={`option ${idx}`}
            />
          </div>
        )}
        {loading && (
          <div className={`${styles.loaderContainer}`}>
            <img className={`${styles.loader}`} src={loader} />
          </div>
        )}
      </div>
      <Modal ref={modalRef}>
        <LinkModal {...props} />
      </Modal>
    </>
  );
};

export default ImageUploader;
