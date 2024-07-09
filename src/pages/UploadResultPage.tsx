import { ColumnDef } from "@tanstack/react-table";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { LogEntry } from "@/lib/Types";
import { useUploadData } from "@/store/useStore";

export const columns: ColumnDef<LogEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "msg",
    header: "Message",
  },
];

function UploadResultPage() {
  const uploadData = useUploadData();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="m-4 flex h-[calc(100vh-120px)] flex-col rounded bg-background p-2">
      <Card className="flex size-full flex-col">
        <CardHeader className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <CardTitle>{uploadData.value.msg}</CardTitle>
          </div>
          <div className="justify-self-end">
            <Button variant="outline" onClick={handleClose} className="ml-2">
              <IoMdClose className="size-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <DataTable columns={columns} data={uploadData.value.logs} />
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadResultPage;
