import { Button } from "@/components/ui/button";
import {
  ResizablePanel,
  resizablePanelVariants,
} from "@/components/ui/resizable";
import { AddBoardButton } from "./AddBoardButton";
import { useState } from "react";
import { BodyProps } from "..";
import { useVariant } from "@/components/VariantProvider";
import { cn } from "@/utils";

export const Sidebar = ({ boards, updateBoards }: BodyProps) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { variant } = useVariant();
  return (
    <ResizablePanel
      // className={`relative flex flex-col items-center justify-start gap-3 bg-neutral-600/70 p-4 backdrop-blur-lg ${isCollapsed && "hidden"}`}
      className={cn(
        resizablePanelVariants({ variant: variant }),
        "relative flex flex-col items-center justify-start gap-3 p-3 data-[panel-size='1.0']:opacity-0",
        isCollapsed && "hidden",
      )}
      id="sidebar"
      collapsible
      collapsedSize={0}
      minSize={5}
      defaultSize={20}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
    >
      <AddBoardButton variant={variant} updateBoards={updateBoards} />
      <Button
        disabled
        variant={"ghost"}
        className="hover:underline hover:underline-offset-2"
      >
        Create new view
      </Button>
      {boards?.map((b) => (
        <Button
          key={b.id}
          variant={variant}
          className="w-full bg-neutral-400 text-black hover:bg-neutral-400/90"
        >
          {b.title}
        </Button>
      ))}
    </ResizablePanel>
  );
};
