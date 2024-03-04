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
import { toast } from "sonner";
import { AddBoardModal } from "./AddBoardModal";

export const Board = (props: BoardConfig) => {
  const { title, lanes, description, notes } = props;
  const [isLaneModalOpen, setLaneModalOpen] = useState(false);
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  useEffect(() => {
    toast.success("Board loaded");
  }, []);

  return (
    <Card className="w-full bg-background/70 backdrop-blur-lg">
      <div className="flex flex-row justify-between">
        <CardHeader className="w-full">
          <div className="flex flex-row justify-between">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <BoardOptionsButton
              boardConfig={props}
              setLaneModalOpen={setLaneModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            {isLaneModalOpen && (
              <AddLaneModal
                boardConfig={props}
                open={isLaneModalOpen}
                onOpenChange={() => setLaneModalOpen((prev) => !prev)}
              />
            )}
            {isBoardModalOpen && (
              <AddBoardModal
                open={isBoardModalOpen}
                setOpen={setBoardModalOpen}
                defaultData={props}
              />
            )}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      </div>
      <CardContent>
        {notes && <p>{notes}</p>}
        <br />
        <div className="flex flex-row items-start justify-center gap-2">
          {lanes ? (
            lanes.map((l) => (
              <Lane key={title + " " + l.title} {...l} boardConfig={props} />
            ))
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
