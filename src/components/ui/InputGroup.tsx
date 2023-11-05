import { ChangeEvent } from "react";

interface PropsType {
  id: string;
  label: string;
  type: "email" | "text";
  value: string;
  inputInvalid: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (i: true) => void;
}

export default function InputGroup({
  id,
  label,
  type,
  onChange,
  value,
  onBlur,
  inputInvalid,
}: PropsType) {
  return (
    <div className="flex flex-col gap-1">
      <label className="uppercase" htmlFor={id}>
        {label}
      </label>
      <input
        onBlur={() => onBlur(true)}
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        className={`w-full p-1 text-stone-700 md:min-w-[18rem] ${
          inputInvalid ? "bg-red-200" : ""
        }`}
      />
      <p className="h-3 text-red-400 ">{inputInvalid ? inputInvalid : ""}</p>
    </div>
  );
}
