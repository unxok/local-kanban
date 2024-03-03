import { ResizablePanel } from "@/components/ui/resizable";

export const Logo = () => (
  <ResizablePanel
    collapsible
    collapsedSize={0}
    minSize={31}
    id="logo"
    className="flex flex-col items-center justify-center"
  >
    <h1 className="text-3xl font-bold tracking-wider text-primary">
      Local Kanban
    </h1>
    <p className="text-sm text-muted-foreground">
      easy | offline | free | kanban
    </p>
  </ResizablePanel>
);
