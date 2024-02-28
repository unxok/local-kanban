import { Lane } from "./Lane";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCards } from "../CardsProvider";
import { BoardMenuButton } from "./BoardMenuButton";
import { useEffect, useState } from "react";
import { LayoutIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent, 
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../ui/alert-dialog";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

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

export type LaneConfig = {
  title: string;
  id: string;
  bg: string;
};

export type BoardProps = {
  id: string;
  title: string;
  description?: string;
  text?: string;
  sortProperty: string;
  laneConfigArr: LaneConfig[];
};

export const Board = (props: BoardProps & { updateBoardConfig: any }) => {
  const { title, id, sortProperty, updateBoardConfig /*,children*/ } = props;
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";
  const laneConfigArr = props.laneConfigArr ? props.laneConfigArr : null;
  if (!laneConfigArr) return <div>Error: Board missing laneConfig</div>;
  const [view, setView] = useState<"board" | "table">("board");
  const { cards } = useCards();
  const copyProps = {...props};
  delete copyProps.updateBoardConfig;
  

  useEffect(() => console.log("cards changed: ", cards), [cards]);

  return (
    <div className="flex flex-col items-center justify-start gap-10 rounded-3xl p-10">
      <Card className="w-full bg-background/70 backdrop-blur-lg">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="ubuntu flex flex-row gap-2">
              {title}
              <span className="opacity-50">{cards?.length || 0}</span>
            </CardTitle>
            <CardDescription className="flex flex-col gap-3">
              {description}
              <span className="flex flex-row gap-2">
                <Button
                  variant={"ghost"}
                  onClick={() => setView("board")}
                  className={`flex flex-row items-center gap-1 hover:text-primary ${view === "board" && "text-primary"}`}
                >
                  <LayoutIcon />
                  <span>Board</span>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setView("table")}
                  className={`flex flex-row items-center gap-1 hover:text-primary ${view === "table" && "text-primary"}`}
                >
                  <ListBulletIcon />
                  <span>Table</span>
                </Button>
              </span>
            </CardDescription>
          </div>
          <BoardMenuButton
            id={id}
            laneConfigArr={laneConfigArr}
            sortProperty={sortProperty}
            title={title}
            description={description}
            text={text}
            updateBoardConfig={updateBoardConfig}
          />
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-row gap-3">
            <p>{text}</p>
            {view === "board" ? (
              <>
                {laneConfigArr.map((l) => (
                  <Lane
                    key={l.id}
                    title={l.title}
                    id={l.id}
                    bg={l.bg}
{/*                     sortProperty={sortProperty} */}
                    updateBoardConfig={updateBoardConfig}
                    boardConfig={copyProps}
                  />
                ))}
              </>
            ) : view === "table" ? (
              <div>table view</div>
            ) : (
              <div>invalid view</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// const AddLaneButton = ({
//   children,
//   updateBoardConfig,
// }: {
//   children: any;
//   updateBoardConfig: any;
// }) => {
//   const defaultLaneConfig = {
//     id: "in-progress",
//     title: "IN PROGRESS",
//     bg: "blue",
//   };
//   const [newLane, setNewLane] = useState(defaultLaneConfig);

//   const updateNewLane = (id: string, value: string) => {
//     setNewLane((prev) => {
//       return {
//         ...prev,
//         [id]: value,
//       };
//     });
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger>{children}</AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Adding a new lane</AlertDialogTitle>
//           <AlertDialogDescription>
//             Add a new lane with the following settings.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <div className="flex w-full flex-col gap-3 py-2">
//           <div className="flex flex-row items-center justify-between">
//             <Label htmlFor="title">Title</Label>
//             <div className="text-secondary-foreground">
//               This is what will display above the lane. All capital letters is
//               recommended
//             </div>
//             <Input
//               id="title"
//               onInput={(e) =>
//                 updateNewLane(e.currentTarget.id, e.currentTarget.value)
//               }
//               className="w-3/4"
//             />
//           </div>
//           <div className="flex flex-row items-center justify-between">
//             <Label htmlFor="description">Description</Label>
//             <div className="text-secondary-foreground">
//               This is the value corresponding to this lane for the configured
//               sort property
//             </div>
//             <Input
//               id="id"
//               onInput={(e) =>
//                 updateNewLane(e.currentTarget.id, e.currentTarget.value)
//               }
//               className="w-3/4"
//             />
//           </div>
//           <div className="flex flex-row items-center justify-between">
//             <Label htmlFor="bg">Background color</Label>
//             <Select
//               onValueChange={(e) => updateNewLane("bg", e)}
//               defaultValue="red"
//             >
//               <SelectTrigger id="bg" className="w-3/4">
//                 <SelectValue placeholder="green" />
//               </SelectTrigger>
//               <SelectContent>
//                 {[
//                   "red",
//                   "orange",
//                   "yellow",
//                   "green",
//                   "purple",
//                   "pink",
//                   "blue",
//                 ].map((c) => (
//                   <SelectItem value={c} key={c}>
//                     {c}
//                   </SelectItem>
//                 ))}
//                 <SelectItem value="red">Light</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel onClick={() => setNewLane(defaultLaneConfig)}>
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             onClick={() => updateBoardConfig(newLane.id, newLane)}
//           >
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
