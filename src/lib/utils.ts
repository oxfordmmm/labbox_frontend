import { type ClassValue, clsx } from "clsx";
import Papa, { ParseError, ParseResult, LocalFile } from "papaparse";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function readCSV(file: LocalFile): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete(results: ParseResult<Record<string, unknown>>) {
        resolve(results.data);
      },
      error(err: ParseError) {
        reject(new Error(err.message));
      },
    });
  });
}
