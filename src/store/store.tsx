import { signal } from "@preact/signals-react";

import { MutationData } from "@/lib/Types";

export const UploadData = signal<MutationData>({
  type: "",
  msg: "",
  logs: [],
});
