import { Button, buttonVariants } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { BoardProps } from "..";
import { BoardDeleteButton } from "./BoardDeleteButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { AddBoardButton } from "@/App";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const BoardMenuButton = (
  props: BoardProps & { updateBoardConfig: any },
) => {
  const { title, updateBoardConfig } = props;
  const propsCopy = { ...props };
  delete propsCopy.updateBoardConfig;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        <HamburgerMenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title} Board</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AddBoardButton
          updateBoardConfig={updateBoardConfig}
          defaultVal={propsCopy}
          asChild={true}
        >
          <Button
            variant={"ghost"}
            className="w-full justify-start px-2 py-1.5"
          >
            Edit
          </Button>
        </AddBoardButton>
        <AddLaneButton board={propsCopy} updateBoardConfig={updateBoardConfig}>
          <Button
            variant={"ghost"}
            className="w-full justify-start px-2 py-1.5"
          >
            Add lane
          </Button>
        </AddLaneButton>
        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          Export
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          Import
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <BoardDeleteButton
          boardConfig={props}
          updateBoardConfig={updateBoardConfig}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AddLaneButton = ({
  children,
  updateBoardConfig,
  board,
}: {
  children: any;
  updateBoardConfig: any;
  board: BoardProps;
}) => {
  const defaultLaneConfig = {
    id: "in-progress",
    title: "IN PROGRESS",
    bg: "blue",
  };
  const [newLane, setNewLane] = useState(defaultLaneConfig);

  const updateNewLane = (id: string, value: string) => {
    setNewLane((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adding a new lane</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new lane with the following settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex w-full flex-col gap-3 py-2">
          <Card className="">
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription className="text-secondary-foreground">
                This is what will display above the lane. All capital letters is
                recommended
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id="title"
                onInput={(e) =>
                  updateNewLane(e.currentTarget.id, e.currentTarget.value)
                }
                className="w-3/4"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription className="text-secondary-foreground">
                This is the value corresponding to this lane for the configured
                sort property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id="id"
                onInput={(e) =>
                  updateNewLane(e.currentTarget.id, e.currentTarget.value)
                }
                className="w-3/4"
              />
            </CardContent>
          </Card>
          <div className="flex flex-row items-center justify-between">
            <Label htmlFor="bg">Background color</Label>
            <Select
              onValueChange={(e) => updateNewLane("bg", e)}
              defaultValue="red"
            >
              <SelectTrigger id="bg" className="w-3/4">
                <SelectValue placeholder="green" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "purple",
                  "pink",
                  "blue",
                ].map((c) => (
                  <SelectItem value={c} key={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setNewLane(defaultLaneConfig)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              board.laneConfigArr.push(newLane);
              updateBoardConfig(board.id, board);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
