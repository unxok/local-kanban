import { buttonVariants } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { SettingsButton } from "./SettingsButton";

export const Nav = () => (
  <ResizablePanel
    className="relative flex items-center justify-between"
    id="nav"
  >
    <div className="flex w-5/6 items-center justify-center">
      <a href="/" className={buttonVariants({ variant: "link" })}>
        Home
      </a>
      <a href="/about" className={buttonVariants({ variant: "link" })}>
        About
      </a>
      <a href="/docs" className={buttonVariants({ variant: "link" })}>
        Docs
      </a>
    </div>
    <div className="flex w-1/6 items-center justify-end px-5">
      <SettingsButton />
    </div>
  </ResizablePanel>
);
