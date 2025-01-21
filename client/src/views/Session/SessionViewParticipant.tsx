import { useSession } from "@/context/sessionContext";

export default function SessionViewParticipant({userId}:{userId:string}){
  const { participants } = useSession();
  const userName = participants[userId]
  return (
    <div>
      <h1>{userId}</h1>
      <h1>{userName}</h1>
    </div>
  );
}