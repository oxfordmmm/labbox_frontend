import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDataType } from "@/lib/Types";
import { readCSV } from "@/lib/utils";
import { useUploadData } from "@/store/useStore";
import useAuth0Api from "@/utils/useAuth0Api";

import Spinner from "./Spinner";

function MutationUpload() {
  const [mutationFile, setMutationFile] = useState<File | null>(null);
  const [mappingFile, setMappingFile] = useState<File | null>(null);
  const [dryRun, setDryRun] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useAuth0Api();
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const uploadData = useUploadData();
  const navigate = useNavigate();

  const handleMutationFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files?.[0]) {
      setMutationFile(files[0]);
    }
  };

  const handleMappingFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files?.[0]) {
      setMappingFile(files[0]);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setDryRun(checked);
  };

  async function uploadFile(formData: FormData): Promise<UploadDataType> {
    try {
      const response = await api.post("/mutation/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadPercentage(percentCompleted);
          }
        },
      });

      return response.data as UploadDataType;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const upload = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data: UploadDataType) => {
      uploadData.value = {
        type: "Mutation Upload",
        msg: data.msg,
        logs: data.logs,
      };

      console.log("Data uploaded successfully", data.logs);
      console.log("Data uploaded successfully", data.msg);

      toast(data.msg);

      navigate("/upload-result");
    },
    onError: () => {
      toast.error("Error uploading data");
    },
  });

  async function handleUpload(): Promise<void> {
    try {
      setIsProcessing(true);
      if (mutationFile && mappingFile) {
        const formData = new FormData();

        const mutationJson: Record<string, unknown>[] =
          await readCSV(mutationFile);
        const mappingJson: Record<string, unknown>[] =
          await readCSV(mappingFile);

        console.log(mutationJson);
        console.log(mappingJson);

        formData.append("Mutation", JSON.stringify(mutationJson));
        formData.append("Mapping", JSON.stringify(mappingJson));
        formData.append("dryRun", dryRun.toString());

        upload.mutate(formData);
      }
    } finally {
      setIsProcessing(false);
    }
  }

  const handleClick = () => {
    if (!mutationFile || !mappingFile) {
      return;
    }

    handleUpload()
      .then(() => {
        console.log("Upload successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Upload Mutation Information</CardTitle>
        <CardDescription>
          Upload the Mutation.csv and the Mapping.csv to import the GPAS
          mutation information in the database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="mutation-file"
          >
            Mutation File
          </Label>
          <Input
            id="mutation-file"
            type="file"
            accept=".csv"
            className="mb-2 w-full rounded-md p-1 file:rounded-md file:px-2 file:py-1"
            onChange={handleMutationFileChange}
            disabled={isProcessing}
          />
          <Label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="mapping-file"
          >
            Mapping File
          </Label>
          <Input
            id="mapping-file"
            type="file"
            accept=".csv"
            className="w-full rounded-md p-1 file:rounded-md file:px-2 file:py-1"
            onChange={handleMappingFileChange}
            disabled={isProcessing}
          />
          <div>
            <div className="flex items-center px-2">
              <Checkbox
                id="dryRunCheckbox"
                checked={dryRun}
                onCheckedChange={handleCheckboxChange}
                disabled={isProcessing}
              />
              <Label className="p-2" htmlFor="dryRunCheckbox">
                Dry run
              </Label>
            </div>
          </div>
        </div>
        {isProcessing ? (
          <>
            <p>Converting to JSON...</p>
            <Spinner loading={isProcessing} />
          </>
        ) : null}
        {upload.isPending ? (
          <div>
            <p>Uploading... {uploadPercentage}%</p>
            <progress value={uploadPercentage} max="100" />
          </div>
        ) : null}
        {upload.isError ? (
          <p>
            Error:{" "}
            {upload.error instanceof Error
              ? upload.error.message
              : "Unknown error"}
          </p>
        ) : null}
        {!isProcessing && upload.isSuccess ? (
          <p>Data uploaded successfully!</p>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          id="uploadButton"
          type="button"
          className="rounded-md px-3 py-2"
          onClick={handleClick}
          disabled={isProcessing}
        >
          Upload and Convert
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MutationUpload;
