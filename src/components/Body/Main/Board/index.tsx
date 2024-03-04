import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BoardConfig } from "..";
import { Lane } from "./Lane";
import { BoardOptionsButton } from "./BoardOptionsButtons";
import { useEffect, useState } from "react";
import { AddLaneModal } from "./BoardOptionsButtons/AddLaneModal";

export const Board = (props: BoardConfig) => {
  const { title, sortProperty, lanes, description, notes } = props;
  const [isLaneModalOpen, setLaneModalOpen] = useState(false);
  useEffect(
    () => console.log("is lane open: ", isLaneModalOpen),
    [isLaneModalOpen],
  );
  return (
    <Card className="w-full">
      <div className="flex flex-row justify-between">
        <CardHeader className="w-full">
          <div className="flex flex-row justify-between">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <BoardOptionsButton
              boardConfig={props}
              setLaneModalOpen={setLaneModalOpen}
            />
            <AddLaneModal
              boardConfig={props}
              open={isLaneModalOpen}
              onOpenChange={() => setLaneModalOpen((prev) => !prev)}
            />
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      </div>
      <CardContent>
        {notes && <p>{notes}</p>}
        <br />
        <div className="flex flex-row items-start justify-center gap-2">
          {lanes ? (
            lanes.map((l) => <Lane key={l.title} {...l} boardConfig={props} />)
          ) : (
            <span className="text-foreground/50">
              No lanes yet... Use the three dots on the right to add one!
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
