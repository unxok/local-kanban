import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner";
import { BoardConfig, getLocalBoards, setLocalBoards } from "./localSave";
import { toast } from "sonner";
import { VariantProvider } from "./components/VariantProvider";

export type UpdateBoardsType = (
  arg:
    | BoardConfig[]
    | ((b: BoardConfig[] | undefined) => BoardConfig[] | undefined)
    | undefined,
) => void;

const App = () => {
  const [boards, setBoards] = useState<BoardConfig[] | undefined>(
    getLocalBoards(),
  );

  useEffect(() => {
    if (!boards) {
      toast.error("No boards save data found");
    } else {
      toast.success("Board save data found");
    }
    if (!boards) return;
    setLocalBoards(boards);
  }, [boards]);

  const updateBoards: UpdateBoardsType = (arg) => {
    if (typeof arg === "function") {
      return setBoards((prev) => arg(prev));
    }
    setBoards(arg);
  };

  return (
    <ThemeProvider defaultTheme="light">
      {/* // TODO Add some state here to allow customizable theme */}
      <VariantProvider defaultVariant="default">
        <div className=" fixed inset-0 bg-[url(https://source.unsplash.com/random/1920x1080?yellow)] bg-cover">
          <ResizablePanelGroup autoSaveId={"app-layout"} direction="vertical">
            <Header />
            <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
            <Body boards={boards} updateBoards={updateBoards} />
          </ResizablePanelGroup>
        </div>
        <Toaster richColors toastOptions={{}} />
      </VariantProvider>
    </ThemeProvider>
  );
};

export default App;
