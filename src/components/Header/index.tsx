import { useVariant } from "@/components/VariantProvider";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
  resizablePanelVariants,
} from "../ui/resizable";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { cn } from "@/utils";

export const Header = (props: {
  setThemeCss: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { variant } = useVariant();
  return (
    <ResizablePanel
      collapsible
      collapsedSize={0}
      minSize={5}
      defaultSize={10}
      className={cn(
        resizablePanelVariants({ variant: variant }),
        "data-[panel-size='1.0']:opacity-0",
      )}
      id="header"
    >
      <ResizablePanelGroup autoSaveId="header-layout" direction="horizontal">
        <Logo />
        <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
        <Nav {...props} />
      </ResizablePanelGroup>
    </ResizablePanel>
  );
};
