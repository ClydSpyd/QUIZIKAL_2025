import SessionViewHost from "./SessionViewHost";
import SessionViewParticipant from "./SessionViewParticipant";

const SessionView = ({ isHost }: { isHost?: boolean }) => {
  
  return isHost ? <SessionViewHost /> : <SessionViewParticipant />;
};

export default SessionView;
