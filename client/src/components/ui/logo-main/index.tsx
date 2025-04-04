import logo from "assets/images/quizikal_logo1.png";

export default function LogoMain() {
  return (
    <div className="w-full flex justify-center">
      <div className={"mt-[20px] flex flex-col items-center"}>
        <img className="h-[90px]" src={logo} alt={"logo"} />
        <h4 className="m-0 text-[1.5rem] relative left-[5px] font-[700] grad-text">
          QUIZIKAL
        </h4>
      </div>
    </div>
  );
}
