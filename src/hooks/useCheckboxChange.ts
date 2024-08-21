import { useState } from "react";

export const useCheckboxChange = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
  };

  return [checked, handleCheckboxChange] as const;
};
