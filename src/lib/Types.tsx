export interface LogEntry {
  id: number;
  level: "NOTSET" | "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  msg: string;
}

export interface UploadData {
  type: string;
  msg: string;
  logs: LogEntry[];
}
