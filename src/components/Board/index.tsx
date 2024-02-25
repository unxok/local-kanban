import { Lane } from "./Lane";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCards } from "../CardsProvider";
import { BoardMenuButton } from "./BoardMenuButton";
import { useEffect } from "react";

export type LaneConfig = {
  title: string;
  id: string;
  bg: string;
};

export type BoardProps = {
  id: string;
  title: string;
  description?: string;
  text?: string;
  sortProperty: string;
  children?: any;
  laneConfigArr: LaneConfig[];
};

export const Board = (props: BoardProps) => {
  const { title, id, sortProperty, laneConfigArr /*,children*/ } = props;
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";

  const { cards } = useCards();

  useEffect(() => console.log("cards changed: ", cards), [cards]);

  return (
    <div className="bg-background-primary flex flex-col items-center justify-start gap-10 rounded-3xl p-10">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="flex flex-row gap-2">
              {title}
              <span className="opacity-50">{cards?.length || 0}</span>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <BoardMenuButton
            id={id}
            laneConfigArr={laneConfigArr}
            sortProperty={sortProperty}
            title={title}
            description={description}
            text={text}
          />
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-row gap-3">
            <p>{text}</p>
            {laneConfigArr.map((l) => (
              <Lane
                key={l.id}
                title={l.title}
                id={l.id}
                bg={l.bg}
                sortProperty={sortProperty}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
