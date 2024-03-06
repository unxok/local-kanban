import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Given an array of objects, finds duplicate objects by the given property name and removes the extra objects
 * @param arr The array to remove from
 * @param key The property to resolve duplications on
 * @returns The same array but with only unique objects by property value
 */
export const removeDuplicateObjects = (
  arr: Record<string, any>[],
  key: string,
) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

/**
 * Triggers a file download
 * @param content The content of the file
 * @param fileName The name of the file to download. Include the extension in the name (.txt, .csv, etc)
 * @param contentType The MIME type of the file. 'text/csv', 'application/json', etc.
 */
export const downloadToFile(content: string, fileName: string, contentType: string) => {
  const a = document.createElement('a');
  const file - new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(a.href);
}

export type Color =
  | "default"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

export const getBgColor = (color: Color) => {
  switch (color) {
    case "red":
      return "bg-red-500/10";
    case "orange":
      return "bg-orange-500/10";
    case "yellow":
      return "bg-yellow-500/10";
    case "green":
      return "bg-green-500/10";
    case "blue":
      return "bg-blue-500/10";
    case "purple":
      return "bg-purple-500/10";
    case "pink":
      return "bg-pink-500/10";
    default:
      return "";
  }
};

export const getBorderColor = (color: Color) => {
  switch (color) {
    case "red":
      return "border-red-500";
    case "orange":
      return "border-orange-500";
    case "yellow":
      return "border-yellow-500";
    case "green":
      return "border-green-500";
    case "blue":
      return "border-blue-500";
    case "purple":
      return "border-purple-500";
    case "pink":
      return "border-pink-500";
    default:
      return "";
  }
};
