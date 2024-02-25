import { DotFilledIcon } from "@radix-ui/react-icons";
import { CardProps } from "../..";

export const LaneHeader = ({
  title,
  bg,
  cards,
}: {
  title: string;
  bg: string;
  cards: CardProps[];
}) => (
  <div className="flex flex-row items-center justify-center gap-2 pb-2">
    <h2 className="flex flex-row items-center font-roboto text-sm font-semibold text-foreground-primary">
      {title}
      <DotFilledIcon color={bg} />
    </h2>
    <span className="text-primary-foreground text-sm font-bold">
      {cards.length}
    </span>
  </div>
);
