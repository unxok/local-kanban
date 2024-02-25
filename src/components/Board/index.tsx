import { LayoutIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Lane } from "./Lane";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2">
            {title}
            <span className="text-primary-foreground">{cardState.length}</span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-row gap-3">
            {laneConfigArr.map((l) => (
              <Lane
                updateCards={updateCards}
                key={l.id}
                title={l.title}
                id={l.id}
                bg={l.bg}
                cards={cards.filter(
                  // @ts-ignore TO DO
                  (card) => card.properties[sortProperty] === l.id,
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
