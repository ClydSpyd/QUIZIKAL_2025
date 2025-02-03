/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { defaultContextData, SocketContextData } from "./types";
import { useParticipantSession } from "../participantSessionContext";
import { useHostSession } from "../hostSessionContext";


const SocketContext = createContext<SocketContextData>(defaultContextData);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  isHost,
  userData,
  sessionCode,
  children,
}: {
  sessionCode: string;
  userData: { username: string; userId: string };
  isHost?: boolean;
  children: React.ReactNode;
}) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const { handleSessionUpdate } = useParticipantSession();
    const { handleSessionUpdate: hostSessionUpdate } = useHostSession();

  useEffect(() => {
    console.log({ userData, isHost });
      
    if (userData) {
      const baseUrl = window.location.origin;
      const query = {
        sessionCode,
        username: userData.username,
        userId: userData.userId,
        isHost: !!isHost,
      };

      const socket = io(baseUrl, {
        path: "/socket",
        query,
      });

      setSocket(socket);


      socket.on("connect_error", (err) => {
        console.error("Socket.IO connection error:", err);
        setError(err.message);
      });
      socket.on("socket-error", (err) => {
        console.error("Socket error:", err);
        setError(err.message);
      });

      socket.on("connect", () => {
        console.log("Socket.IO connection established:", socket.id);
      });

      socket.on("init-client", (data) => {
        console.log("ÖÖ Received init-client data:", data);
        handleSessionUpdate(data);
      });

      socket.on(
        "session-data-client",
        (data: Partial<SessionClientPayload>) => {
          console.log("ÖÖ session-data-client:", data);
          handleSessionUpdate(data);
        }
      );

      socket.on(
        "session-data-host",
        (data: Partial<SessionClientPayload>) => {
          console.log("ÖÖ session-data-host:", data);
          hostSessionUpdate(data);
        }
      );

      socket.on("disconnect", () => {
        console.log("Socket.IO connection closed:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket.IO connection error:", err);
      });

      socket.on("users", (updatedUsers) => {
        console.log("users updated");
        console.log({ updatedUsers });
        setConnectedUsers(updatedUsers);
      });

      return () => {
        if (socket) {
          console.log("Disconnecting socket:", socket.id);
          socket.disconnect();
          setSocket(null);
        }
      };
    }
  }, [userData, isHost]);

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  if (error || socket == null) {
    console.log({ error, socket, isNull: socket == null });
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center pb-[20%] box-border">
        <h1>{error ?? "LOADING SOCKET"}</h1>
        {error && <h1 className="rotate-90 text-2xl">:(</h1>}
      </div>
    );
  }

  return (
    <SocketContext.Provider value={{ error, socket, connectedUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
