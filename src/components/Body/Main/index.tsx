import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Board } from "./Board";
import { useSaveContext } from "@/components/SaveProvider";
import { useEffect } from "react";

export type LaneCardConfig = {
  title: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
  notes?: string;
};
export type LaneConfig = {
  title: string;
  sortValue: string;
  description?: string;
  bg?: string;
};
export type BoardConfig = {
  title: string;
  sortProperty: string;
  lanes?: LaneConfig[];
  description?: string;
  notes?: string;
  cards?: LaneCardConfig[];
};

export const fakeCards: LaneCardConfig[] = [
  {
    title: "Take out trash",
    description: "unless not empty",
    notes: "trash day on Thursdays",
    tags: ["task", "gross"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Buy groceries",
    description: "for the week",
    notes: "remember to check for discounts",
    tags: ["task", "costco"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Finish coding assignment",
    description: "due by Friday",
    notes: "test thoroughly before submission",
    tags: ["coding", "school"],
    properties: {
      status: "todo",
    },
  },
  {
    title: "Call mom",
    description: "check in and catch up",
    notes: "she's been feeling unwell lately",
    tags: ["family"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Exercise",
    description: "at least 30 minutes",
    notes: "try a new workout routine",
    properties: {
      status: "done",
    },
  },
];

export const fakeLanes: LaneConfig[] = [
  {
    title: "BACKLOG",
    sortValue: "backlog",
  },
  {
    title: "TO DO",
    description: "Things to do",
    sortValue: "todo",
  },
  {
    title: "DONE",
    sortValue: "done",
  },
];

export const fakeBoards: BoardConfig[] = [
  {
    title: "General Tasks",
    sortProperty: "status",
    lanes: fakeLanes,
    description: "my general list of to do items",
    notes: "here are some random notes",
  },
];

export const Main = () => {
  const { boardData } = useSaveContext();
  const boardKeys = Object.keys(boardData);
  useEffect(() => console.log("data: ", boardData), [boardData]);

  return (
    <ResizablePanel className="relative h-full" id="main">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col items-center justify-center gap-3 p-3">
          {boardKeys[0] ? (
            boardKeys.map((bTitle) => {
              const b = boardData[bTitle];
              return <Board key={b.title} {...b} />;
            })
          ) : (
            <div>No boards yet</div>
          )}
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
};
