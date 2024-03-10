import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { AddBoardButton } from "./AddBoardButton";
import { useState } from "react";
import { BodyProps } from "..";

export const Sidebar = ({ boards, updateBoards }: BodyProps) => {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <ResizablePanel
      className={`relative flex flex-col items-center justify-start gap-3 bg-neutral-600/70 p-4 backdrop-blur-lg ${isCollapsed && "hidden"}`}
      id="sidebar"
      collapsible
      collapsedSize={0}
      minSize={5}
      defaultSize={20}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
    >
      <AddBoardButton updateBoards={updateBoards} />
      <Button disabled variant={"link"}>
        Create new view
      </Button>
      {boards?.map((b) => (
        <Button key={b.id} variant={"outline"} className="w-full">
          {b.title}
        </Button>
      ))}
    </ResizablePanel>
  );
};
