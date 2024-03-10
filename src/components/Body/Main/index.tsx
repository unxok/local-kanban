import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BodyProps } from "..";

export const Main = ({ boards, updateBoards }: BodyProps) => {
  return (
    <ResizablePanel className="relative h-full" id="main">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col items-center justify-center gap-3 p-3">
          {boards?.map((b) => <div key={b.id}>{b.title}</div>)}
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
};
