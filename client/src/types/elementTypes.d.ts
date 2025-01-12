declare interface InputType {
  type: "text" | "password" | "email";
  ref?: React.RefObject<HTMLInputElement>;
  name: string;
  placeholder: string;
  onChange?: (...args: any[]) => any;
  autofocus?: boolean;
}