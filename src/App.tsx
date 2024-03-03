import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "./components/ui/resizable";

const App = () => (
  <ThemeProvider>
    {/* // TODO Add some state here to allow customizable theme */}
    <div className=" fixed inset-0 ">
      <ResizablePanelGroup autoSaveId={"app-layout"} direction="vertical">
        <Header />
        <ResizableHandle />
        <Body />
      </ResizablePanelGroup>
    </div>
  </ThemeProvider>
);

export default App;
