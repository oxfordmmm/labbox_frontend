import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCheckboxChange } from "@/hooks/useCheckboxChange";
import { useFileChange } from "@/hooks/useFileChange";
import { useFileUpload } from "@/hooks/useFileUpload";

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

import Spinner from "@components/Spinner";

function SummaryUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const uploadData = useUploadData();
  const navigate = useNavigate();
  const [dryRun, handleCheckboxChange] = useCheckboxChange();
  const [summaryFile, handleSummaryFileChange] = useFileChange();
  const [mappingFile, handleMappingFileChange] = useFileChange();
  const { uploadPercentage, fileUpload } = useFileUpload("/summary/upload");

  const handleUpload = async (): Promise<void> => {
    try {
      if (summaryFile && mappingFile) {
        setIsProcessing(true);
        const formData = new FormData();

        console.log("Reading CSV files...");

        const mutationJson: Record<string, unknown>[] =
          await readCSV(summaryFile);
        const mappingJson: Record<string, unknown>[] =
          await readCSV(mappingFile);

        console.log("setting the form data...");

        formData.append("Summary", JSON.stringify(mutationJson));
        formData.append("Mapping", JSON.stringify(mappingJson));
        formData.append("dryRun", dryRun.toString());

        console.log("uploading the form data...");

        await new Promise<void>((resolve, reject) => {
          console.log("calling the mutate function...");
          fileUpload.mutate(formData, {
            onSuccess: (data: UploadDataType) => {
              uploadData.value = {
                type: "Summary Upload",
                msg: data.msg,
                logs: data.logs,
              };
              toast.success(data.msg);
              navigate("/upload-result");
              console.log("Data uploaded successfully");
              resolve();
            },
            onError: () => {
              toast.error("Error uploading data");
              reject();
            },
            onSettled: () => {
              setIsProcessing(false);
            },
          });
        });
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("An unexpected error occurred");
    }
  };

  const handleClick = () => {
    if (!summaryFile || !mappingFile) {
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
        <CardTitle>Upload Summary Information</CardTitle>
        <CardDescription>
          Upload the Summary.csv and the Mapping.csv to import the GPAS summary
          information in the database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="summary-file"
          >
            Summary File
          </Label>
          <Input
            id="summary-file"
            type="file"
            accept=".csv"
            className="mb-2 w-full rounded-md p-1 file:rounded-md file:px-2 file:py-1"
            onChange={handleSummaryFileChange}
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
        {fileUpload.isPending ? (
          <div>
            <p>Uploading... {uploadPercentage}%</p>
            <progress value={uploadPercentage} max="100" />
          </div>
        ) : null}
        {fileUpload.isError ? (
          <p>
            Error:{" "}
            {fileUpload.error instanceof Error
              ? fileUpload.error.message
              : "Unknown error"}
          </p>
        ) : null}
        {!isProcessing && fileUpload.isSuccess ? (
          <p>Data uploaded successfully!</p>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          id="uploadButton"
          type="button"
          className="rounded-md px-3 py-2"
          onClick={handleClick}
          disabled={!summaryFile || !mappingFile || isProcessing}
        >
          Upload and Convert
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SummaryUpload;
