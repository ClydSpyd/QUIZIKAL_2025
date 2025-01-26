/* eslint-disable @typescript-eslint/no-explicit-any */
import spinner from "assets/loaders/spin_green.svg";
import styles from "./CardForm.module.scss";
import { Link } from "react-router-dom";
import { cn } from "@/utilities/cn";

interface Props {
  inputs: InputType[];
  title: string;
  error: string | null | undefined;
  btnRef: React.RefObject<HTMLInputElement>;
  onSubmit: (...args: any[]) => any;
  allowAutofill?: boolean;
  titleColor?: 'yellow' | 'orange';
  icon?: React.ReactNode;
  conditionalInput?: {
    condition: boolean,
    input: InputType
  }
  btnText?: string;
  link?: {
    linkText: string;
    route: string;
    text: string;
  };
  className?: string;
  loading?: boolean;
}

const CardForm = ({
  title,
  inputs,
  onSubmit,
  error,
  link,
  className,
  icon,
  loading = false,
  btnRef,
  btnText = "Go",
  conditionalInput,
  titleColor = 'orange',
  allowAutofill = false,
}: Props) => {
  const Icon = icon;

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col border-2 border-grey2 p-[16px] pt-[8px] gap-[8px] rounded-md relative ${className}`}
    >
      {loading && (
        <div className={`absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-greyOpaque2 z-10 backdrop-blur-md`}>
          <img src={spinner} className="h-[75px] w-[75px] relative bottom-[5%]" />
        </div>
      )}
      <div className={`flex justify-center items-center gap-[10px]`}>
        <h1
          className={cn(titleColor == "orange" ? "text-main1" : "text-main3")}
        >
          {title}
        </h1>
        {Icon && Icon}
      </div>
      {!allowAutofill && (
        <>
          <input
            className={`hidden absolute pointer-events-none`}
            type="text"
            name="username"
          />
          <input
            className={`hidden absolute pointer-events-none`}
            type="password"
            name="fake-password"
          />
        </>
      )}
      {inputs.map((input: InputType, idx: number) => (
        <input
          className="box-border bg-grey2 px-2 h-[40px]"
          key={idx}
          type={input.type}
          onChange={input.onChange}
          name={input.name}
          placeholder={input.placeholder}
          ref={input.ref ?? null}
          autoFocus={!!input.autofocus}
        />
      ))}
      {conditionalInput && (
        <div
          className={cn(`${styles.revealWrapper} ${
            conditionalInput.condition && styles.open
          }`)}
        >
          <input
          className="px-2"
            placeholder={conditionalInput.input.placeholder}
            ref={conditionalInput.input.ref ?? null}
            type={conditionalInput.input.type}
            name={conditionalInput.input.name}
          />
        </div>
      )}
      <input ref={btnRef} type="submit" value={btnText} />
      <div className={`${styles.errorDiv} ${error && styles.show}`}>
        <p className={`${styles.error}`}>{error ?? ""}</p>
      </div>
      {link && (
        <p className="text-xs my-[5px] w-full text-center font-500">
          {link.text} <Link className="text-main1 hover:text-main1 hover:underline" to={link.route}>{link.linkText}</Link>
        </p>
      )}
    </form>
  );
};

export default CardForm;
