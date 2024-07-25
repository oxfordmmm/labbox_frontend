import { type ClassValue, clsx } from "clsx";
import Papa, { LocalFile } from "papaparse";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Assuming you have a known structure for your CSV data, define it here
type CSVRecord = Record<string, string | number>;

export function readCSV<T extends Record<string, unknown> = CSVRecord>(
  file: LocalFile
): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(new Error(err.message)),
    });
  });
}
