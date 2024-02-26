import { ArrowTopRightIcon, GearIcon } from "@radix-ui/react-icons";
import "./App.css";
import { Board, BoardProps } from "./components/Board";
import { CardsProvider } from "./components/CardsProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { CardDescription, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { ScrollArea } from "./components/ui/scroll-area";

// const fakeData: CardProps[] = [
//   {
//     title: "Take out trash",
//     description: "Make sure to get recycling too",
//     id: "take-out-trash",
//     tags: ["task"],
//     text: "Note: trash day on Thursday. But it's pretty big anyway",
//     properties: {
//       type: "task",
//       due: "2023/02/26",
//       status: "to-do",
//     },
//   },
//   {
//     title: "Make the bed",
//     description: "Fix the sheets, lay out blankets, etc.",
//     id: "make-the-bed",
//     tags: ["task"],
//     text: "You may want to grab the fur roller thing too just in case there's a bunch of cat hair everywhere",
//     properties: {
//       type: "task",
//       due: "2023/02/26",
//       status: "to-do",
//     },
//   },
//   {
//     title: "Clean litter box",
//     description: "Put in outisde bin!",
//     id: "clean-litter-box",
//     tags: ["task", "gross", "trash", "chore", "house"],
//     text: "I hate doing this but it must be done! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea aliquam reiciendis earum reprehenderit architecto porro, consequatur nulla consectetur deleniti aperiam fuga voluptatum quos fugiat corrupti autem alias iure voluptatibus odio? Quidem, amet porro quasi voluptatem beatae modi animi ullam ab odit inventore. Error magnam, quas laudantium labore ducimus eveniet, cupiditate repellendus quaerat ratione eaque animi autem deserunt eligendi veritatis repellat. Reprehenderit maiores, modi obcaecati assumenda reiciendis iusto dolores, odio eum veniam necessitatibus minus facere alias excepturi. Quam quidem molestiae repudiandae unde similique nobis odit aperiam magnam, delectus illo accusamus alias.",
//     properties: {
//       type: "task",
//       due: "2023/02/24",
//       status: "in-progress",
//     },
//   },
// ];

// const fakeLaneConfig: LaneConfig[] = [
//   {
//     title: "TO DO",
//     id: "to-do",
//     bg: "red",
//   },
//   {
//     title: "IN PROGRESS",
//     id: "in-progress",
//     bg: "blue",
//   },
//   {
//     title: "COMPLETED",
//     id: "completed",
//     bg: "green",
//   },
// ];

// const fakeBoardConfig: BoardProps = {
//   id: "unxoks-board",
//   title: "Unxoks Saved Tasks",
//   description: "a short description",
//   text: "bleep bloop bloop",
//   sortProperty: "status",
//   laneConfigArr: [
//     {
//       title: "TO DO",
//       id: "to-do",
//       bg: "red",
//     },
//     {
//       title: "IN PROGRESS",
//       id: "in-progress",
//       bg: "blue",
//     },
//     {
//       title: "COMPLETED",
//       id: "completed",
//       bg: "green",
//     },
//   ],
// };

function App() {
  const [boardConfigs, setBoardConfigs] = useState<BoardProps[] | undefined>();
  useEffect(() => {
    const boards = localStorage.getItem("boards");
    if (!boards) return;
    setBoardConfigs(JSON.parse(boards));
    console.log(JSON.parse(boards));
  }, []);

  const updateBoardConfig = (id: string, newConfig: BoardProps) => {
    if (!boardConfigs) {
      setBoardConfigs([newConfig]);
      localStorage.setItem("boards", JSON.stringify([newConfig]));
    }
    const foundBoard = boardConfigs?.find((b) => b.id === id);
    if (!foundBoard) {
      setBoardConfigs((prev) => {
        if (!prev) return [newConfig];
        const newBoards = [...prev, newConfig];
        localStorage.setItem("boards", JSON.stringify([newBoards]));
        return newBoards;
      });
    }
    const filteredBoards = boardConfigs?.filter((b) => b.id !== id);
    if (!filteredBoards) {
      throw new Error("You shouldn't be seeing this. Check App.tsx line 110");
    }
    setBoardConfigs([...filteredBoards, newConfig]);
    localStorage.setItem(
      "boards",
      JSON.stringify([...filteredBoards, newConfig]),
    );
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CardsProvider>
        <div className="bg-background-secondary fixed inset-0 flex flex-col">
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
                    <AddBoardButton updateBoardConfig={updateBoardConfig} />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <Separator />
          <ScrollArea>
            <div className="flex flex-col gap-2 p-3">
              <div>
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

              <div className="">
                {boardConfigs &&
                  boardConfigs?.map((board) => (
                    <Board
                      key={board.id}
                      title={board.title}
                      id={board.id}
                      description={board.description}
                      sortProperty={board.sortProperty}
                      laneConfigArr={board.laneConfigArr}
                    ></Board>
                  ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </CardsProvider>
    </ThemeProvider>
  );
}

export default App;

export const AddBoardButton = ({updateBoardConfig}: {updateBoardConfig: (id: string, newConfig: BoardProps) => BoardProps[] | void}) => {
  //
  const [newBoardConfig, setNewBoardConfig] = useState<string>("");

  const updateNewBoardConfig = () => {
    try {
      const json = JSON.parse(newBoardConfig);
      updateBoardConfig(json.id, json)
    } catch (e) {
      console.log('not valid JSON', e)
    }
  }

  return (
    <AlertDialog>
    <AlertDialogTrigger className={buttonVariants({variant: 'ghost'})}>
        Add board
      </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add new board</AlertDialogTitle>
        <AlertDialogDescription>
          Add a new board. Right now it has to be JSON in the following format:
          <pre><code>
            {JSON.stringify({
              id: "unxoks-board",
              title: "Unxoks Saved Tasks",
              description: "a short description",
              text: "bleep bloop bloop",
              sortProperty: "status",
              laneConfigArr: [
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
              ],
            }, undefined, 2)}
          </code></pre>
          <Input value={newBoardConfig} onChange={e => setNewBoardConfig(e.currentTarget.value)} />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => updateNewBoardConfig()}>Create</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  )
}
