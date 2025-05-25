/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHostSession } from "@/context/hostSessionContext";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useSessionData } from "@/queries/sessionData";
import { API } from "@/api";
import spinner from "@/assets/loaders/spin_black.svg";
import { useEffect, useState } from "react";
import ParticipantListItem from "./ParticipantListItem";
import { useSocket } from "@/context/socketContext";

export default function Participants() {
  const {
    sessionCode,
    participants: listItems,
    roundIdx,
    questionIdx,
  } = useHostSession();
  const { socket } = useSocket();
  const { refetch } = useSessionData({ sessionCode });
  const [loading, setLoading] = useState(false);
  const [respondedUsers, setRespondedUsers] = useState<string[]>([]);

  socket?.on("response-received", (payload: { userId: string }) => {
    setRespondedUsers((prev) => [...prev, payload.userId]);
  });

  useEffect(() => {
    const getResponses = async () => {
      const { data, error } = await API.session.fetchQuestionResponses(
        sessionCode,
        roundIdx,
        questionIdx
      );

      if (data) {
        setRespondedUsers(Object.keys(data));
      }
      console.log({ data, error });
    };

    getResponses();
  }, [roundIdx, questionIdx]);

  const handleNewParticipant = async () => {
    setLoading(true);
    const { data, error } = await API.session.addParticipant(sessionCode);
    console.log({ data, error });
    refetch().then(() => setLoading(false));
  };

  const handleDeleteParticipant = async (userCode: string) => {
    await API.session.removeParticipant(sessionCode, userCode);
    refetch();
  };

  let longestUsername = 12; // default lenght for defaultName = "Participant [X]"
  Object.entries(listItems).forEach(([_, { username }]) => {
    if (username && username.length > longestUsername)
      longestUsername = username.length;
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full border border-main3Dark rounded-lg text-sm">
        <div
          className={`w-full flex  bg-black1 py-[12px] px-4 justify-between border-b border-b-main3Dark rounded-t-lg`}
        >
          <div className="flex items-center justify-center text-lg">
            PARTICIPANTS
          </div>
          <div />
          <button
            onClick={handleNewParticipant}
            className="w-[90px] h-[30px] py-0 flex gap-2 items-center justify-center bg-main2 text-black font-bold hover:border-white"
          >
            {loading ? (
              <img src={spinner} className="h-[35px] w -[35px]" />
            ) : (
              <>
                <MdPersonAddAlt1 className="text-black text-xl" size={"xl"} />
              </>
            )}
          </button>
        </div>
        {!Object.entries(listItems).length ? (
          <h4 className="w-full text-center py-2">NO SESSION PARTICIPANTS</h4>
        ) : (
          Object.entries(listItems).map(
            ([userId, userData]: [string, Participant], idx: number) => (
              <ParticipantListItem
                hasResponded={!!respondedUsers.includes(userId)}
                key={userId}
                name={userData.username ?? userData.defaultName}
                userId={userId}
                handleDelete={() => handleDeleteParticipant(userId)}
                lastItem={idx === Object.entries(listItems).length - 1}
                longestUsername={longestUsername}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
