import { useNavigate } from "react-router-dom";
import sessionIcon from "assets/images/session.png";
import styles from "../../views/HostDash/HostDash.module.scss";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useUserData } from "@/queries/userData";
import LoadingScreen from "@/components/utilityComps/LoadingScreen/LoadingScreen";
import shuttle from "assets/images/shuttle_white.png";

const ActiveSession = () => {
  const navigate = useNavigate();

  const { data: userData, isLoading } = useUserData();

  const goToSession = async () => {
    if (!userData?.activeSession) return;
    navigate(`/host/${userData.activeSession.sessionCode}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="mb-4 w-full p-4 relative rounded-lg border border-main2 bg-black1">
      <div className={`${styles.sectionTitleWrapper}`}>
        <img className="" src={sessionIcon} alt={"session-icon"} />
        <p className="text-main1 text-lg">Active Session</p>
      </div>
      {userData?.activeSession ? (
        <div className="my-2 flex items-center w-full justify-between">
          <h3 className="text-xl">{userData.activeSession.sessionName}</h3>
          <button className="!text-sm bg-black" onClick={goToSession}>
            <p className="!text-sm">Go To Session</p>{" "}
            <BsArrowRightSquareFill className={`h-[18px] w-[18px] ml-2`} />
          </button>
        </div>
      ) : (
        <div className="my-2 gap-2 flex flex-col justify-center items-center w-full">
          <p className="text-sm text-white/80">No active session found</p>
          <div
            // onClick={() => nameModalRef.current?.open()}
            className={`flex gap-2 cursor-pointer items-center border border-transparent px-4 py-2 mb-4 bg-black text-white transition-colors duration-300 ease-in-out hover:border-main1 rounded-md`}
          >
            <p className="text-base">Launch Session</p>
            <img src={shuttle} className={"h-[20px] w-[20px]"} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ActiveSession;
