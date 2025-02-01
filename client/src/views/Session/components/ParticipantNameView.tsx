import { API } from "@/api";
import CardForm from "@/components/utilityComps/CardForm/CardForm";
import LogoPageWrapper from "@/components/utilityComps/LogoPageWrapper";
import { useParticipantSession } from "@/context/participantSessionContext";
import { useRef, useState } from "react";

export default function ParticipantNameView() {
  const { userData, sessionCode, refetch } = useParticipantSession();
  const btnRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  // const userName = participants[userId]
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameInput = usernameRef.current?.value;

    if (!nameInput || !userData) {
      return;
    }

    setLoading(true);

    const { data, error } = await API.session.setParticipentName(
      sessionCode,
      userData.id,
      nameInput
    );

    console.log({ data, error });

    if (error) {
      setError(error);
    } else {
      refetch().then(() => setLoading(false));
      console.log(data);
    }

    setLoading(false);
  };

  const inputs: InputType[] = [
    {
      autofocus: true,
      placeholder: "username",
      ref: usernameRef,
      type: "text",
      name: "username",
    },
  ];

  return (
    <LogoPageWrapper>
      <div className="grow flex justify-center items-center pb-[20%]">
        <CardForm
          title={"WELCOME!"}
          subtitle={"Please provide a username"}
          inputs={inputs}
          onSubmit={handleSubmit}
          btnText="GO"
          error={error}
          loading={loading}
          btnRef={btnRef}
        />
      </div>
    </LogoPageWrapper>
  );
}
