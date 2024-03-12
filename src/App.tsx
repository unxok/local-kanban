import { useEffect, useState } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner";
import {
  BoardConfig,
  CardConfig,
  getLocalBoards,
  getLocalCards,
  getRandomImageBase64,
  loadThemeCss,
  saveThemeCss,
  setLocalBoards,
  setLocalCards,
} from "./localSave";
import { toast } from "sonner";
import { VariantProvider } from "./components/VariantProvider";

export type UpdateBoardsType = (
  arg:
    | BoardConfig[]
    | ((b: BoardConfig[] | undefined) => BoardConfig[] | undefined)
    | undefined,
) => void;

export type UpdateCardsType = (
  arg:
    | CardConfig[]
    | ((b: CardConfig[] | undefined) => CardConfig[] | undefined)
    | undefined,
) => void;

const App = () => {
  const [boards, setBoards] = useState<BoardConfig[] | undefined>(
    getLocalBoards(),
  );
  const [cards, setCards] = useState<CardConfig[] | undefined>(getLocalCards());
  const [dataBase64, setDataBase64] = useState<string>();
  const [themeCss, setThemeCss] = useState("");

  const doBoardEffect = () => {
    setLocalBoards(boards ? boards : []);
  };

  const doCardsEffect = () => {
    setLocalCards(cards ? cards : []);
  };

  const doRandomImageEffect = () => {
    const searchTerms = localStorage.getItem("searchTerms");
    (async () => {
      const imgBase64 = await getRandomImageBase64(searchTerms || "");
      imgBase64 && setDataBase64(imgBase64);
    })();
  };

  const doStaticImageEffect = () => {
    const imgBase64 = localStorage.getItem("staticBackground");
    imgBase64 && setDataBase64(imgBase64);
  };

  const doThemeEffect = () => {
    if (!themeCss) {
      const css = localStorage.getItem("themeCss");
      setThemeCss(css || "");
      loadThemeCss();
      return;
    }
    saveThemeCss(themeCss);
    loadThemeCss();
  };

  useEffect(() => {
    if (!boards) {
      toast.error("No boards save data found");
    } else {
      toast.success("Board save data found");
    }
    doBoardEffect();
    doCardsEffect();
    const bgType = localStorage.getItem("bgType");
    bgType === "static" ? doStaticImageEffect() : doRandomImageEffect();
    doThemeEffect();
  }, [boards, cards, themeCss]);

  const updateBoards: UpdateBoardsType = (arg) => {
    if (typeof arg === "function") {
      return setBoards((prev) => arg(prev));
    }
    setBoards(arg);
  };

  const updateCards: UpdateCardsType = (arg) => {
    if (typeof arg === "function") {
      return setCards((prev) => arg(prev));
    }
    setCards(arg);
  };

  return (
    <ThemeProvider defaultTheme="light">
      {/* // TODO Add some state here to allow customizable theme */}
      <VariantProvider defaultVariant="default">
        <div
          className=" fixed inset-0 bg-secondary bg-cover"
          style={{
            backgroundImage: `url(${dataBase64})`,
          }}
        >
          <ResizablePanelGroup autoSaveId={"app-layout"} direction="vertical">
            <Header setThemeCss={setThemeCss} />
            <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
            <Body
              boards={boards}
              updateBoards={updateBoards}
              cards={cards}
              updateCards={updateCards}
            />
          </ResizablePanelGroup>
        </div>
        <Toaster richColors toastOptions={{}} />
      </VariantProvider>
    </ThemeProvider>
  );
};

export default App;
