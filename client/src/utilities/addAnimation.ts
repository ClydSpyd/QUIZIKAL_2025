import { type RefObject } from "react";

export const addAnimation = (
  anim: string,
  ref: RefObject<HTMLElement>,
  timeout: number
) => {
  ref.current?.classList.add(anim);
  setTimeout(() => {
    ref.current?.classList.remove(anim);
  }, timeout);
};
