import { LayoutIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Lane } from "./Lane";
import { useState } from "react";

export type LaneConfig = {
  title: string;
  id: string;
  bg: string;
};

export type CardProps = {
  title: string;
  id: string;
  description?: string | null;
  text?: string | null;
  tags?: string[] | null;
  properties?: { [key: string]: any } | null;
};

type BaseBoardProps = {
  sortProperty: string;
  children?: any;
  cards: CardProps[];
  laneConfigArr: LaneConfig[];
};

type Spread<Type> = { [Key in keyof Type]: Type[Key] };
type BoardProps = Spread<CardProps & BaseBoardProps>;

export const Board = (props: BoardProps) => {
  const { title, id, cards, sortProperty, laneConfigArr, children } = props;
  const [cardState, setCardState] = useState<CardProps[]>(cards);
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";
  const tags = props.tags ? props.tags : [];
  const properties = props.properties ? props.properties : [];

  const updateCards = (newCardState: CardProps[]) => setCardState(newCardState);

  return (
    <div className="fixed inset-10 flex flex-col items-center justify-start gap-10 rounded-3xl bg-background-primary p-10">
      <div className="font-ubuntu flex w-full flex-col items-center justify-start rounded-3xl bg-background-primary">
        {/* Holds title and card number */}
        <div className="flex w-full flex-row items-center justify-start gap-2">
          <h1 className="text-3xl font-semibold text-foreground-primary">
            {title}
          </h1>
          <span className="font-bold text-foreground-secondary">
            {cards.length}
          </span>
        </div>
        {/* Holds board and list buttons */}
        <div className="flex w-full flex-row items-center justify-start gap-10 text-accent-50">
          <div className="flex flex-row items-center justify-center gap-2">
            <LayoutIcon /> <span>Board</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 text-white">
            <ListBulletIcon /> <span>List</span>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-row gap-3">
        {laneConfigArr.map((c) => (
          <Lane
            updateCards={updateCards}
            key={c.id}
            title={c.title}
            id={c.id}
            bg={c.bg}
            cards={cards.filter(
              // @ts-ignore TO DO
              (card) => card.properties[sortProperty] === c.id,
            )}
          />
        ))}
      </div>
    </div>
  );
};
