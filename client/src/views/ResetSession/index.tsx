import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loader from "assets/loaders/spin_orange.svg";

export default function ResetSessionView() {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleReset = async () => {
    const { data } = await axios.post(`/api/session/${sessionCode}/reset`, {
      sessionCode,
    });
    console.log({ data });
    if (data.message) {
      setSuccess(true);
    }
    setTimeout(() => {
      setLoading(false);
      // navigate(`/play/${sessionCode}`);
    }, 500);
  };

  useEffect(() => {
    handleReset();
  }, []);

  const { sessionCode } = useParams();
  return (
    <div className="h-screen w-screen flex flex-col gap-1 items-center justify-center pb-[30vh]">
      {loading ? (
        <img className="h-[80px] w-[80px]" src={loader} />
      ) : success ? (
        <>
          <p>SESSION SUCCESFULLY RESET</p>
          <div
            className="py-2 px-4 bg-black text-sm rounded-md cursor-pointer mt-2 border border-white/30 hover:border-main1"
            onClick={() => navigate(`/host/${sessionCode}`)}
          >
            GO TO SESSION
          </div>
        </>
      ) : (
        <p>SOMETHING WENT WRONG :(</p>
      )}
    </div>
  );
}
