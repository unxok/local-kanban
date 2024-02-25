import "./App.css";
import { Board, LaneConfig } from "./components/Board";
import { CardProps, CardsProvider } from "./components/CardsProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { CardDescription, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";

const fakeData: CardProps[] = [
  {
    title: "Take out trash",
    description: "Make sure to get recycling too",
    id: "take-out-trash",
    tags: ["task"],
    text: "Note: trash day on Thursday. But it's pretty big anyway",
    properties: {
      type: "task",
      due: "2023/02/26",
      status: "to-do",
    },
  },
  {
    title: "Make the bed",
    description: "Fix the sheets, lay out blankets, etc.",
    id: "make-the-bed",
    tags: ["task"],
    text: "You may want to grab the fur roller thing too just in case there's a bunch of cat hair everywhere",
    properties: {
      type: "task",
      due: "2023/02/26",
      status: "to-do",
    },
  },
  {
    title: "Clean litter box",
    description: "Put in outisde bin!",
    id: "clean-litter-box",
    tags: ["task", "gross"],
    text: "I hate doing this but it must be done!",
    properties: {
      type: "task",
      due: "2023/02/24",
      status: "in-progress",
    },
  },
];

const fakeLaneConfig: LaneConfig[] = [
  {
    title: "TO DO",
    id: "to-do",
    bg: "red",
  },
  {
    title: "IN PROGRESS",
    id: "in-progress",
    bg: "blue",
  },
  {
    title: "COMPLETED",
    id: "completed",
    bg: "green",
  },
];

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CardsProvider localCards={fakeData}>
        <div className="bg-background-secondary fixed inset-0 flex flex-col">
          <div>
            <div className="p-3">
              <CardTitle className="ubuntu-regular text-3xl">
                Local Kanban
              </CardTitle>
              <CardDescription>
                Smooth and easy task management that works completely offline
              </CardDescription>
            </div>
            <Separator />
          </div>
          <Board
            title={"Unxok's Tasks"}
            id={"id"}
            description={"a description"}
            sortProperty={"status"}
            laneConfigArr={fakeLaneConfig}
          ></Board>
          <ThemeToggle></ThemeToggle>
        </div>
      </CardsProvider>
    </ThemeProvider>
  );
}

export default App;
