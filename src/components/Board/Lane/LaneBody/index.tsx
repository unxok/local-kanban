import { LaneProps } from "..";
import { LaneCard } from "./LaneCard";

const getBgColor = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "yellow":
      return "bg-yellow-500";
    case "green":
      return "bg-green-500";
    case "blue":
      return "bg-blue-500";
    case "purple":
      return "bg-purple-500";
    case "pink":
      return "bg-pink-500";
  }
};

const getBorderColor = (color: string) => {
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
  }
};

export const LaneBody = ({ id, bg, cards, updateCards }: LaneProps) => {
  const bgColor = getBgColor(bg);
  const borderColor = getBorderColor(bg);
  return (
    <div
      id={id}
      className={`flex h-max min-h-24 w-full flex-col gap-3 rounded-lg border border-solid bg-opacity-10 p-3 pb-24 ${bgColor} ${borderColor}`}
    >
      {/* LaneCard */}
      {cards.map((c) => (
        <LaneCard
          key={c.id}
          id={c.id}
          title={c.title}
          description={c.description}
          properties={c.properties}
          tags={c.tags}
          text={c.text}
        />
      ))}
    </div>
  );
};
