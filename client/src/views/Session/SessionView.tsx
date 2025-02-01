import SessionViewHost from "./SessionViewHost";
import SessionViewParticipant from "./SessionViewParticipant";

const SessionView = ({ isHost }: { isHost?: boolean }) => {
  // const { sidecar } = useParams();

  // if (sidecar && sidecar === sidecarCode) return <SessionViewSidecar />;

  return isHost ? <SessionViewHost /> : <SessionViewParticipant />;
};

export default SessionView;
