import { useState } from "react";
import "./App.css";
import { Board, CardProps, LaneConfig } from "./components/Board";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

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
      <div className="fixed inset-0 bg-background-secondary">
        Local Kanban
        <Board
          cards={fakeData}
          title={"Unxok's Tasks"}
          id={"id"}
          description={"a description"}
          sortProperty={"status"}
          laneConfigArr={fakeLaneConfig}
        ></Board>
        <ThemeToggle></ThemeToggle>
      </div>
    </ThemeProvider>
  );
}

export default App;
