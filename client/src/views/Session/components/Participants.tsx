import { useHostSession } from "@/context/hostSessionContext";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useSessionData } from "@/queries/sessionData";
import { API } from "@/api";
import spinner from "@/assets/loaders/spin_black.svg";
import { useState } from "react";
import ParticipantListItem from "./ParticipantListItem";

export default function Participants() {
  const { sessionCode, participants: listItems } = useHostSession();
  const { refetch } = useSessionData({ sessionCode });
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="w-[700px] flex flex-col items-center">
      {/* <h3>PARTICIPANTS</h3> */}
      <div className="w-full border-2 border-black1 rounded-lg text-sm">
        <div
          className={`w-full flex  bg-black1 py-[12px] px-4 justify-between border-b border-b-main1Dark rounded-t-lg`}
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
                key={userId}
                name={userData.username ?? userData.defaultName}
                userId={userId}
                handleDelete={() => handleDeleteParticipant(userId)}
                lastItem={idx === Object.entries(listItems).length - 1}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
