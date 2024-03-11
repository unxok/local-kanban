import { ResizablePanel } from "@/components/ui/resizable";
import { SettingsButton } from "./SettingsButton";

export const Nav = () => (
  <ResizablePanel
    className="relative flex items-center justify-between"
    id="nav"
  >
    <div className="flex w-5/6 items-center justify-center gap-5">
      <a href="/" className="hover:underline hover:underline-offset-2">
        Home
      </a>
      <a
        href="https://github.com/unxok/local-kanban/"
        className="hover:underline hover:underline-offset-2"
      >
        About
      </a>
      <a
        href="https://github.com/unxok/local-kanban/"
        className="hover:underline hover:underline-offset-2"
      >
        Docs
      </a>
    </div>
    <div className="flex w-1/6 items-center justify-end px-5">
      <SettingsButton />
    </div>
  </ResizablePanel>
);
