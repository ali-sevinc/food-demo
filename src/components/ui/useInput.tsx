import { ChangeEvent, useState } from "react";

export default function useInput(
  validationFunction: (value: string) => boolean,
) {
  const [value, setValue] = useState("");
  const [isBlur, setIsBlur] = useState<boolean>(false);

  const valueIsValid = validationFunction(value);
  const isValueInvalid = isBlur && !valueIsValid;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    value,
    handleChange,
    setIsBlur,
    isValueInvalid,
    valueIsValid,
  };
}
