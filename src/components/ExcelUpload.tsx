import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as readExcelFile from "read-excel-file";

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
import { UploadData } from "@/lib/Types";
import { useUploadData } from "@/store/useStore";
import useAuth0Api from "@/utils/useAuth0Api";

import Spinner from "./Spinner";

interface Props {
  worksheetsToConvert: string[];
}

function ExcelUpload({ worksheetsToConvert }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [dryRun, setDryRun] = useState<boolean>(true);
  const api = useAuth0Api();
  const navigate = useNavigate();
  const uploadData = useUploadData();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.[0]) {
      setFile(files[0]);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setDryRun(checked);
  };

  async function uploadFile(formData: FormData): Promise<UploadData> {
    try {
      const response = await api.post("/spreadsheet/upload", formData, {
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

      return response.data as UploadData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const upload = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data: UploadData) => {
      uploadData.value = {
        type: "Spreadsheet Upload",
        msg: data.msg,
        logs: data.logs,
      };

      console.log("Data uploaded successfully", data.logs);
      console.log("Data uploaded successfully", data.msg);

      toast.success(data.msg);

      navigate("/upload-result");
    },
    onError: () => {
      toast.error("Error uploading file");
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);

  async function handleUpload(): Promise<void> {
    try {
      setIsProcessing(true);
      if (file) {
        const formData = new FormData();
        const sheets = await readExcelFile.readSheetNames(file);
        await Promise.all(
          sheets.map(async (sheet) => {
            if (worksheetsToConvert.includes(sheet)) {
              const rows = await readExcelFile.default(file, { sheet });
              const headers = rows[0] as string[];
              const jsonData = rows.slice(1).map((row) =>
                row.reduce((acc: Record<string, unknown>, cur, index) => {
                  acc[headers[index]] = cur;
                  return acc;
                }, {})
              );
              formData.append(sheet, JSON.stringify(jsonData));
            }
          })
        );

        formData.append("dryRun", dryRun.toString());

        upload.mutate(formData);
      }
    } finally {
      setIsProcessing(false);
    }
  }

  const handleClick = () => {
    if (!file) {
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
        <CardTitle>Upload Excel Workbook</CardTitle>
        <CardDescription>
          Upload an Excel Workbook containing Specimen, Sample, Runs and Storage
          information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Input
            type="file"
            accept=".xlsm, .xlsx, .xls"
            className="w-full rounded-md p-1 file:rounded-md file:px-2 file:py-1"
            onChange={handleFileChange}
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

export default ExcelUpload;
