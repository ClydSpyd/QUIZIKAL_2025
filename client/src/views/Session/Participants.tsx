import { useSession } from "@/context/sessionContext";
import styles from "./SessionView.module.scss";
import { MdDeleteForever, MdPersonAddAlt1 } from "react-icons/md";
import { useSessionData } from "@/queries/sessionData";
import { API } from "@/api";
import { FaRegCopy } from "react-icons/fa";
import TooltipWrapper from "@/components/utilityComps/TooltipWrapper";

const ListRow = ({name, code}:{name:string, code:string}) => {
  const { sessionCode } = useSession();

  const handleCopyCode = async () => {
    const textToCopy = `${window.location.host}/play/${sessionCode}${code}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        console.log("Text copied to clipboard!");
      } else {
        // Fallback for environments without Clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        console.log("Text copied using fallback!");
      }
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className={`${styles.row}`}>
      <div>{name}</div>
      <div>{code}</div>
      <div className={styles.icons}>
        <TooltipWrapper message="copy participant link">
          <div onClick={handleCopyCode} className={styles.iconContainer}>
            <FaRegCopy style={{ height: "17px", width: "17px" }} />
          </div>
        </TooltipWrapper>
        <TooltipWrapper message="delete participant">
          <div className={styles.iconContainer}>
            <MdDeleteForever style={{ height: "20px", width: "20px" }} />
          </div>
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default function Participants() {
  const { sessionCode, participants: listItems } = useSession();
  const { refetch } = useSessionData({ sessionCode });

  console.log({ listItems });

  const handleNewParticipant = async () => {
    const { data, error } = await API.session.addParticipant(sessionCode);
    console.log({ data, error });
    refetch();
  };

  return (
    <div className={styles.participantsContainer}>
      <h3>PARTICIPANTS</h3>
      <div className={styles.participantList}>
        <div className={`${styles.topBar} ${styles.row}`}>
          <div>NAME</div>
          <div>CODE</div>
          <div />
        </div>
        {!Object.entries(listItems).length ? (
          <h4>NO PARTICIPANTS FOUND</h4>
        ) : (
          Object.entries(listItems).map(([code, name]: [string, string]) => (
            <ListRow name={name} code={code} />
          ))
        )}
      </div>
      <button onClick={handleNewParticipant} className={styles.addUserBtn}>
        Add <MdPersonAddAlt1 />
      </button>
    </div>
  );
}
