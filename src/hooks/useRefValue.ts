import { useEffect, useRef, useState } from "react";

export const useRefValue = <T>(val: T) => {
  const [value, setValue] = useState<T | undefined>(val);
  const valueRef = useRef(value);

  valueRef.current = value;
  useEffect(() => {
    setValue(val);
  }, [val]);

  return [value, setValue, valueRef] as [
    T,
    React.Dispatch<React.SetStateAction<T | undefined>>,
    React.MutableRefObject<T | undefined>
  ];
};
