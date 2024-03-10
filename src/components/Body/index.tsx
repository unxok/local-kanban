import { BoardConfig } from "@/localSave";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "../ui/resizable";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";
import { UpdateBoardsType } from "@/App";

export type BodyProps = {
  boards: BoardConfig[] | undefined;
  updateBoards: UpdateBoardsType;
};
export const Body = (props: BodyProps) => {
  return (
    <ResizablePanel id="body">
      <ResizablePanelGroup autoSaveId="body-layout" direction="horizontal">
        <Sidebar {...props} />
        <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
        <Main {...props} />
      </ResizablePanelGroup>
    </ResizablePanel>
  );
};
