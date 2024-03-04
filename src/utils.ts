import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
      return "bg-red-500/50";
    case "orange":
      return "bg-orange-500/50";
    case "yellow":
      return "bg-yellow-500/50";
    case "green":
      return "bg-green-500/50";
    case "blue":
      return "bg-blue-500/50";
    case "purple":
      return "bg-purple-500/50";
    case "pink":
      return "bg-pink-500/50";
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
