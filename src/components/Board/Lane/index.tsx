import { CardProps, LaneConfig } from "..";
import { LaneFooter } from "./LaneFooter";
import { LaneHeader } from "./LaneHeader";
import { LaneBody } from "./LaneBody";

export type LaneProps = {
  cards: CardProps[];
  updateCards: (newCardState: CardProps[]) => void;
} & LaneConfig;

export const Lane = ({ title, id, bg, cards, updateCards }: LaneProps) => {
  return (
    <div className="flex w-0 flex-1 flex-col">
      <LaneHeader title={title} bg={bg} cards={cards} />
      <LaneBody
        title={title}
        id={id}
        bg={bg}
        cards={cards}
        updateCards={updateCards}
      />
      <LaneFooter />
      {/* instead of gap, place indicator component here */}
    </div>
  );
};
