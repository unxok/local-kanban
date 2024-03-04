import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { AddBoardButton } from "./AddBoardButton";
import { useSaveContext } from "@/components/SaveProvider";

export const Sidebar = () => {
  const { boardList } = useSaveContext();
  return (
    <ResizablePanel
      className="relative flex flex-col items-center justify-start gap-3 p-4"
      id="sidebar"
      collapsible
      collapsedSize={0}
      minSize={10}
    >
      <AddBoardButton />
      <Button disabled variant={"link"}>
        Create new view
      </Button>
      {boardList.map((b) => (
        <Button key={b} variant={"outline"} className="w-full">
          {b}
        </Button>
      ))}
    </ResizablePanel>
  );
};
