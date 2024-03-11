import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BodyProps } from "..";
import { Board } from "@/components/Board";

export const Main = ({
  boards,
  updateBoards,
  cards,
  updateCards,
}: BodyProps) => {
  return (
    <ResizablePanel className="relative h-full" id="main">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col items-center justify-center gap-3 p-3">
          {boards?.map((b) => (
            <Board
              updateBoards={updateBoards}
              cards={cards?.filter((c) => c.board === b.id)}
              updateCards={updateCards}
              key={b.id}
              {...b}
            />
          ))}
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
};
