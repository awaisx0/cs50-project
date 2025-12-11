import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const inputProps = {
    value: value,
    onChange: (e) => setValue(e.target.value),
  };
  return inputProps;
}
export default useInput;
