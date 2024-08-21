import { useState } from "react";
import { UploadDataType } from "@/lib/Types";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/utils/api";

interface UseFileUploadReturnType {
  uploadPercentage: number;
  fileUpload: UseMutationResult<UploadDataType, Error, FormData>;
}

export const useFileUpload = (endpoint: string): UseFileUploadReturnType => {
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const uploadFile = async (formData: FormData): Promise<UploadDataType> => {
    try {
      console.log("calling the api...");

      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
        onUploadProgress: (progressEvent) => {
          console.log("Upload progress event:", progressEvent);
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(percentCompleted);
          }
        },
      });
      console.log("api response:", response.data);
      return response.data as UploadDataType;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error uploading file: ${error.message}`);
      } else {
        throw new Error("Error uploading file");
      }
    }
  };

  const fileUpload: UseMutationResult<UploadDataType, Error, FormData> =
    useMutation({
      mutationFn: uploadFile,
    });

  return {
    uploadPercentage,
    fileUpload,
  };
};
