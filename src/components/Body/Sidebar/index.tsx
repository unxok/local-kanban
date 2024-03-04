import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { AddBoardButton } from "./AddBoardButton";
import { useSaveContext } from "@/components/SaveProvider";
import { useState } from "react";

export const Sidebar = () => {
  const { boardList } = useSaveContext();
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <ResizablePanel
      className={`relative flex flex-col items-center justify-start gap-3 bg-background/70 p-4 backdrop-blur-lg ${isCollapsed && "hidden"}`}
      id="sidebar"
      collapsible
      collapsedSize={0}
      minSize={5}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
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
