import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PropsType {
  children: ReactNode;
  onClose: () => void;
}
export default function Modal({ children, onClose }: PropsType) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 z-10 h-screen w-full backdrop-blur-sm"
      />
      <div className="fixed left-[calc(50%-10rem)] top-48 z-20 w-[20rem] rounded-xl bg-stone-950 shadow-xl sm:left-[calc(50%-16rem)] sm:w-[32rem] md:left-[calc(50%-22rem)] md:w-[44rem]">
        {children}
      </div>
    </>,
    document.getElementById("modal-overlay")!,
  );
}
