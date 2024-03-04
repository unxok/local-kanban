import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "../ui/resizable";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

export const Header = () => (
  <ResizablePanel
    collapsible
    collapsedSize={0}
    minSize={5}
    className="bg-background/70 backdrop-blur-lg data-[panel-size='1.0']:opacity-0"
    id="header"
  >
    <ResizablePanelGroup autoSaveId="header-layout" direction="horizontal">
      <Logo />
      <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
      <Nav />
    </ResizablePanelGroup>
  </ResizablePanel>
);
