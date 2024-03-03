import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "../ui/resizable";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

export const Body = () => (
  <ResizablePanel id="body">
    <ResizablePanelGroup autoSaveId="body-layout" direction="horizontal">
      <Sidebar />
      <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
      <Main />
    </ResizablePanelGroup>
  </ResizablePanel>
);
