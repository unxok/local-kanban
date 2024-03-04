import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { SaveProvider } from "./components/SaveProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "./components/ui/resizable";

const App = () => (
  <ThemeProvider>
    {/* // TODO Add some state here to allow customizable theme */}
    <SaveProvider>
      <div className=" fixed inset-0 ">
        <ResizablePanelGroup autoSaveId={"app-layout"} direction="vertical">
          <Header />
          <ResizableHandle />
          <Body />
        </ResizablePanelGroup>
      </div>
    </SaveProvider>
  </ThemeProvider>
);

export default App;
