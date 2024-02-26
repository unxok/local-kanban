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
import { useEffect, useState } from "react";
import { LayoutIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

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
  laneConfigArr: LaneConfig[];
};

export const Board = (props: BoardProps) => {
  const { title, id, sortProperty, laneConfigArr /*,children*/ } = props;
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";

  const [view, setView] = useState<"board" | "table">("board");
  const { cards } = useCards();

  useEffect(() => console.log("cards changed: ", cards), [cards]);

  return (
    <div className="bg-background-primary flex flex-col items-center justify-start gap-10 rounded-3xl p-10">
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="ubuntu flex flex-row gap-2">
              {title}
              <span className="opacity-50">{cards?.length || 0}</span>
            </CardTitle>
            <CardDescription className="flex flex-col gap-3">
              {description}
              <span className="flex flex-row gap-2">
                <Button
                  variant={"ghost"}
                  onClick={() => setView("board")}
                  className={`flex flex-row items-center gap-1 hover:text-primary ${view === "board" && "text-primary"}`}
                >
                  <LayoutIcon />
                  <span>Board</span>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setView("table")}
                  className={`flex flex-row items-center gap-1 hover:text-primary ${view === "table" && "text-primary"}`}
                >
                  <ListBulletIcon />
                  <span>Table</span>
                </Button>
              </span>
            </CardDescription>
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
            {view === "board" ? (
              <>
                {laneConfigArr.map((l) => (
                  <Lane
                    key={l.id}
                    title={l.title}
                    id={l.id}
                    bg={l.bg}
                    sortProperty={sortProperty}
                  />
                ))}
              </>
            ) : view === "table" ? (
              <div>table view</div>
            ) : (
              <div>invalid view</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
