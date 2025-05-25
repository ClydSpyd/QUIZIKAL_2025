/* eslint-disable react-hooks/exhaustive-deps */
import HostSessionProvider, {
  useHostSession,
} from "@/context/hostSessionContext";
import Participants from "./components/Participants";
import { motion } from "framer-motion";
import RoundDisplay from "./components/RoundDisplay";
import QuestionPreview from "./components/QuestionPreview";
import QuickActions from "./QuickActions";
import QuestionControls from "./components/QuestionControls";
import { useParams } from "react-router-dom";
import SidecarView from "../Sidecar";

const Content = () => {
  const { roundIdx, questionIdx, quizData, sidecarCode } = useHostSession();
  const { sidecar } = useParams();

  if (sidecar) {
    return sidecar === sidecarCode ? <SidecarView /> : <h1>Ö</h1>;
  }

  return (
    <div className="w-screen max-w-[1300px] grid lg:grid-cols-4 box-border gap-3 pt-2 pb-20 px-4">
      {/* // left col */}
      <div className="col-span-1 flex flex-col md:flex-row lg:flex-col gap-3">
        <div className="w-full md:w-1/2 lg:w-full bg-[#171717] rounded-lg border border-main3Dark">
          <RoundDisplay />
        </div>
        <div className="w-full md:w-1/2 lg:w-full bg-[#171717] rounded-lg grow border border-main2Dark">
          <QuickActions />
        </div>
      </div>

      {/* // right col */}
      <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-y-3 auto-rows-min">
        <div className="col-span-2 flex flex-col md:flex-row gap-3 items-start">
          <div className="w-full md:w-1/2 h-full">
            <QuestionControls />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <QuestionPreview
              questionData={quizData?.rounds[roundIdx]?.[questionIdx] ?? null}
            />
          </div>
        </div>
        {/* <div className="col-span-3">
          <QuestionPreview
            questionData={quizData?.rounds[roundIdx]?.[questionIdx] ?? null}
          />
        </div> */}
        <div className="col-span-3">
          <Participants />
        </div>
      </div>
    </div>
  );
};

export default function SessionViewHost() {
  return (
    <HostSessionProvider>
      <motion.div
        key={"dash"}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Content />
      </motion.div>
    </HostSessionProvider>
  );
}
