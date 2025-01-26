import loader from "@/assets/loaders/spin_orange.svg";

const LoadingScreen = () => {
  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center pb-[20%]`}
    >
      <img className={`h-[65px] w-[65px]`} src={loader} />
    </div>
  );
};

export default LoadingScreen;
