import { useEffect, useRef, useState } from 'react';
import styles from './LinkModal.module.scss';
import { ImLink } from "react-icons/im";

function checkURL(url: string) {
  return(url.split('?')[0].match(/\.(jpeg|jpg|gif|png)$/) != null);
}

interface Props {
  idx: number;
  handleClose?: () => void;
  callback: (idx: number, url: string) => void;
}
const LinkModal = ({ handleClose, idx, callback }: Props) => {
  const [ inputValue, setInputValue ] = useState<string>('')
  const contRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      contRef.current?.classList.add(styles.show);
    },50)
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!checkURL(inputValue)) return
    callback(idx, inputValue)
  };

  return (
    <div ref={contRef} className={`${styles.linkModalContainer}`}>
      <div className={`${styles.inputWrapper}`}>
        <ImLink />
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            name="linkText"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
        </form>
      </div>
      <div className={`${styles.buttons}`}>
        <div onClick={handleClose} className={`${styles.btn}`}>
          Cancel
        </div>
        <div
          onClick={handleSubmit}
          className={`${styles.btn} ${
            !checkURL(inputValue) && styles.disabled
          }`}
        >
          GO
        </div>
      </div>
    </div>
  );
}

export default LinkModal;