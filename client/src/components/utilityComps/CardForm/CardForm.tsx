/* eslint-disable @typescript-eslint/no-explicit-any */
import spinner from "assets/loaders/spin_green.svg";
import styles from "./CardForm.module.scss";
import { Link } from "react-router-dom";

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
    <form onSubmit={onSubmit} className={`${styles.card} ${className}`}>
      {loading && (
        <div className={`${styles.loaderDiv}`}>
          <img src={spinner} />
        </div>
      )}
      <div className={`${styles.titleRow}`}>
        <h1 className={`${styles[titleColor]}`}>{title}</h1>
        {Icon && Icon}
      </div>
      {!allowAutofill && (
        <>
          <input
            className={`${styles.hiddenInput}`}
            type="text"
            name="username"
          />
          <input
            className={`${styles.hiddenInput}`}
            type="password"
            name="fake-password"
          />
        </>
      )}
      {inputs.map((input: InputType, idx: number) => (
        <input
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
          className={`${styles.revealWrapper} ${
            conditionalInput.condition && styles.open
          }`}
        >
          <input
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
        <p>
          {link.text} <Link to={link.route}>{link.linkText}</Link>
        </p>
      )}
    </form>
  );
};

export default CardForm;
