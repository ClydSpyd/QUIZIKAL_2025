/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useSessionUtilities } from "@/hooks/useSessionUtilities";
import SessionView from "./SessionView";
import bouncy from "assets/loaders/bounce_orange.svg";
import SessionProvider, { useSession } from "@/context/hostSessionContext";

const Content = () => {
  const { handleExitSession } = useSessionUtilities();
  const navigate = useNavigate();
  const { isHost, loading, error } = useSession();

  // if (!quizData) return <LoadingScreen />;

  // if (!username && !sidecar) return <NameInput />;

  return (
    <div className="">
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "100",
          display: "flex",
          gap: "5px",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {isHost ? (
          <button onClick={() => navigate("/")}>Home</button>
        ) : (
          <button onClick={handleExitSession} className={`exit`}>
            Exit
          </button>
        )}
      </div>
      {/* <SocketProvider
        username={username}
        sessionCode={sessionCode!}
        isHost={isHost}
      > */}
      {loading ? (
        <>
          <img style={{ height: "60px" }} src={bouncy} />
          <p style={{ fontSize: "0.8rem" }}>Loading session data</p>
        </>
      ) : error ? (
        <>
          <h5>{error} :(</h5>
          <button onClick={handleExitSession}>OK</button>
        </>
      ) : (
        <SessionView />
      )}
      {/* </SocketProvider> */}
    </div>
  );
};

export default function SessionContainer() {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
}
