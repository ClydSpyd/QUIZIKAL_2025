import SessionViewHost from "./SessionViewHost";
import SessionViewParticipant from "./SessionViewParticipant";
import { motion } from "framer-motion";

const SessionView = ({ isHost }: { isHost?: boolean }) => {
  // const { sidecar } = useParams();

  // if (sidecar && sidecar === sidecarCode) return <SessionViewSidecar />;

  return (
    <motion.div
      key={"dash"}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isHost ? <SessionViewHost /> : <SessionViewParticipant />};
    </motion.div>
  );
};

export default SessionView;
