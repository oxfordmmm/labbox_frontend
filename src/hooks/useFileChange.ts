import { useState } from "react";

export const useFileChange = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.[0]) {
      setFile(files[0]);
    }
  };

  return [file, handleFileChange] as const;
};
