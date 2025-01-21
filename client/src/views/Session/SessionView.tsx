/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "@/context/sessionContext";
import SessionViewHost from "./SessionViewHost";
// import SessionViewSidecar from "./SessionViewSidecar";
import SessionViewParticipant from "./SessionViewParticipant";

const SessionView = () => {
  // const { sidecar } = useParams();
  const { isHost, userId } = useSession();

  // if (sidecar && sidecar === sidecarCode) return <SessionViewSidecar />;

  return isHost ? (
    <SessionViewHost />
  ) : userId && (
    <SessionViewParticipant userId={userId}/>
  );
};

export default SessionView;
