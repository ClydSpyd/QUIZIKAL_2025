/* eslint-disable react-hooks/exhaustive-deps */
import { MdClose } from "react-icons/md";
import { Notification, NotificationLevel } from "./types";
import { useEffect, useState } from "react";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { delay } from "@/utilities/delay";
import { cn } from "@/utilities/cn";

const levelIcons: Record<NotificationLevel, React.ReactElement> = {
  success: (
    <div className="rounded-full bg-main2 h-[20px] w-[20px] flex items-center justify-center">
      <FaCheck className="text-white h-[10px]" />
    </div>
  ),
  info: <FaInfoCircle className="text-main3" size={20} />,
  warning: <RiErrorWarningFill className="text-main3" size={23} />,
  error: <RiErrorWarningFill className="text-red-500" size={23} />,
};

export default function Toast({
  toastData,
  removeToast,
}: {
  toastData: Notification;
  removeToast: (key: string) => void;
}) {
  const [exit, setExit] = useState(false);

  const dismissToast = () => {
    setExit(true);
    delay(350).then(() => removeToast(toastData.key));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (exit) return;
      setExit(true);
      delay(350).then(() => removeToast(toastData.key));
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={dismissToast}
      className={cn(
        "bg-grey3 shadow-md rounded-md w-[300px] transition-all duration-300 ease-out overflow-hidden border border-slate-200 animate-drop-in",
        !exit ? "h-[55px] opacity-100 my-1" : "h-0 opacity-0 my-[-1px]"
      )}
    >
      <div className={cn("flex items-center gap-2 h-full w-full px-4")}>
        {levelIcons[toastData.level]}
        <div
          className={cn(
            "flex-grow font-[500]",
            toastData.level !== "error" ? "text-white" : "text-red-500"
          )}
        >
          <h3 className="text-[14px]">{toastData.message}</h3>
        </div>
        <div
          className={cn(
            "text-slate-600 cursor-pointer duration-300 ease-in-out transition-all opacity-30 hover:opacity-100"
          )}
        >
          <MdClose size={18} />
        </div>
      </div>
    </div>
  );
}
