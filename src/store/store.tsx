import { signal } from "@preact/signals-react";

import { UploadDataType } from "@/lib/Types";

export const UploadData = signal<UploadDataType>({
  type: "",
  msg: "",
  logs: [],
});
