import { useHostSession } from "@/context/hostSessionContext";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useSessionData } from "@/queries/sessionData";
import { API } from "@/api";
import spinner from "@/assets/loaders/spin_orange.svg";
import { useState } from "react";
import ParticipantListItem from "./components/ParticipantListItem";

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
      <h3>PARTICIPANTS</h3>
      <div className="w-full border-2 border-black1 rounded-md text-sm">
        <div className={`w-full flex  bg-black1 py-1`}>
          <div className="w-1/2 flex items-center justify-center">NAME</div>
          <div className="w-1/4 flex items-center justify-center">CODE</div>
          <div />
        </div>
        {!Object.entries(listItems).length ? (
          <h4 className="w-full text-center py-2">NO SESSION PARTICIPANTS</h4>
        ) : (
          Object.entries(listItems).map(
            ([code, userData]: [string, Participant]) => (
              <ParticipantListItem
                key={code}
                name={userData.username ?? userData.defaultName}
                code={code}
                handleDelete={() => handleDeleteParticipant(code)}
              />
            )
          )
        )}
      </div>
      <button
        onClick={handleNewParticipant}
        className="mt-1 w-[90px] h-[40px] py-0 flex items-center justify-center"
      >
        {loading ? (
          <img src={spinner} className="h-[35px] w -[35px]" />
        ) : (
          <>
            {" "}
            Add <MdPersonAddAlt1 />
          </>
        )}
      </button>
    </div>
  );
}
