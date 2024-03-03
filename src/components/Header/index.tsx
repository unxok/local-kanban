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
    collapsedSize={1}
    minSize={10}
    className="data-[panel-size='1.0']:opacity-0"
    id="header"
  >
    <ResizablePanelGroup autoSaveId="header-layout" direction="horizontal">
      <Logo />
      <ResizableHandle className="" />
      <Nav />
    </ResizablePanelGroup>
  </ResizablePanel>
);
