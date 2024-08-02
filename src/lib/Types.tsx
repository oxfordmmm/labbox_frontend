export interface LogEntry {
  id: number;
  level: "NOTSET" | "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  msg: string;
}

export interface UploadDataType {
  type: string;
  msg: string;
  logs: LogEntry[];
}
