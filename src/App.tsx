import { ArrowTopRightIcon, GearIcon } from "@radix-ui/react-icons";
import "./App.css";
import { Board, LaneConfig } from "./components/Board";
import { CardProps, CardsProvider } from "./components/CardsProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { CardDescription, CardTitle } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "./components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";

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
    tags: ["task", "gross", "trash", "chore", "house"],
    text: "I hate doing this but it must be done! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea aliquam reiciendis earum reprehenderit architecto porro, consequatur nulla consectetur deleniti aperiam fuga voluptatum quos fugiat corrupti autem alias iure voluptatibus odio? Quidem, amet porro quasi voluptatem beatae modi animi ullam ab odit inventore. Error magnam, quas laudantium labore ducimus eveniet, cupiditate repellendus quaerat ratione eaque animi autem deserunt eligendi veritatis repellat. Reprehenderit maiores, modi obcaecati assumenda reiciendis iusto dolores, odio eum veniam necessitatibus minus facere alias excepturi. Quam quidem molestiae repudiandae unde similique nobis odit aperiam magnam, delectus illo accusamus alias.",
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
            <div className="flex flex-row items-center justify-between p-3">
              <div>
                <CardTitle className="ubuntu-medium text-3xl text-primary">
                  Local Kanban
                </CardTitle>
                <CardDescription>
                  Smooth and easy task management that works completely offline
                </CardDescription>
              </div>
              <Sheet>
                <SheetTrigger
                  className={`p-3 ${buttonVariants({ variant: "ghost" })}`}
                >
                  <GearIcon />
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                      Nothing to see here yet...
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <Separator />
            <div className="flex flex-col items-start gap-2 p-3">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    defaultValue={"default"}
                    placeholder={"All Boards"}
                  />
                </SelectTrigger>
                <SelectContent className="relative">
                  <SelectItem value="default">All Boards</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem className="text-primary" value="system">
                    <span className="flex w-full flex-row items-center gap-1">
                      Manage views
                      <ArrowTopRightIcon />
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
