import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { SaveProvider } from "./components/SaveProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "./components/ui/resizable";
import { Toaster } from "./components/ui/sonner";

const App = () => (
  <ThemeProvider>
    {/* // TODO Add some state here to allow customizable theme */}
    <SaveProvider>
      <div className=" fixed inset-0 bg-[url(/abstract-1.svg)] bg-cover">
        <ResizablePanelGroup autoSaveId={"app-layout"} direction="vertical">
          <Header />
          <ResizableHandle className="data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=hover]:bg-primary" />
          <Body />
        </ResizablePanelGroup>
      </div>
      <Toaster richColors toastOptions={{}} />
    </SaveProvider>
  </ThemeProvider>
);

export default App;
