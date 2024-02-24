import { CardProps, LaneConfig } from "..";

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

type LaneProps = {
  cards: CardProps[];
  updateCards: (newCardState: CardProps[]) => void;
} & LaneConfig;

export const Lane = ({ title, id, bg, cards, updateCards }: LaneProps) => {
  const bgColor = getBgColor(bg);
  const borderColor = getBorderColor(bg);
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-center gap-2">
        <h2 className="font-roboto text-sm font-semibold text-foreground-primary">
          {title}
        </h2>
        <span className="font-bold text-foreground-secondary">
          {cards.length}
        </span>
      </div>
      <div
        id={id}
        className={`h-max min-h-24 w-full rounded-lg border border-solid bg-opacity-10 p-3 ${bgColor} ${borderColor}`}
      >
        {cards.map((c) => (
          <div
            draggable
            className="shdadow-md relative flex flex-col gap-2 rounded-md bg-background-primary p-2 text-foreground-primary shadow-sm shadow-black hover:cursor-grab active:cursor-grabbing"
          >
            <h3 className="font-semibold" key={c.id}>
              {c.title}
            </h3>
            <ul className="flex flex-row gap-1">
              {c?.tags?.map((t) => (
                <li className="font-ubuntu py-.5 rounded-lg bg-accent-30 bg-opacity-75 px-2 text-xs lowercase text-accent-60 text-background-primary">
                  {t}
                </li>
              ))}
            </ul>
            <button className="absolute bottom-1 right-2 text-lg tracking-wide">
              ...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
