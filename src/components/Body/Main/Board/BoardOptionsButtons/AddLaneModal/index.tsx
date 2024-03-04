import { BoardConfig, LaneConfig } from "../../..";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useSaveContext } from "@/components/SaveProvider";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const defaultFormState: LaneConfig = {
  title: "TO DO",
  sortValue: "todo",
  description: "things to do",
  bg: "green",
};

export const AddLaneModal = ({
  boardConfig,
  open,
  onOpenChange,
  defaultData,
}: {
  boardConfig: BoardConfig;
  open: boolean;
  onOpenChange: (b: boolean) => void;
  defaultData?: LaneConfig;
}) => {
  const [errMsgArr, setErrMsgArr] = useState<string[] | null>(null);
  const [formState, setFormState] = useState(defaultData || defaultFormState);
  const { updateBoard, checkDuplicate } = useSaveContext();

  const updateFormState = (id: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const errors = [];
    if (!formState.title) errors.push("Must have a non-blank Title");
    if (!formState.sortValue) errors.push("Must have a non-blank Sort Value");
    if (checkDuplicate("lane", formState.title, boardConfig.title))
      errors.push(`Board title "${formState.title}" is already in use`);
    if (errors.length) {
      setErrMsgArr(errors);
      e.preventDefault();
      return;
    }
    const currentLanes = boardConfig.lanes ? [...boardConfig.lanes] : [];
    const newBoardState = {
      ...boardConfig,
      lanes: [...currentLanes, formState],
    };
    updateBoard(newBoardState);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a new lane</AlertDialogTitle>
            <AlertDialogDescription>
              You can add cards after creating the lane.
            </AlertDialogDescription>
            {errMsgArr && (
              <Alert variant={"destructive"}>
                <CrossCircledIcon />
                <AlertTitle>Uh oh! One or more errors were found:</AlertTitle>
                <AlertDescription>
                  <ul>
                    {errMsgArr.map((e) => (
                      <li key={e + "-error"} className="list-inside list-disc">
                        {e}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="title">Title</Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="title"
                  placeholder="TO DO"
                  onInput={(e) =>
                    updateFormState(e.currentTarget.id, e.currentTarget.value)
                  }
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="sortValue">Sort Value</Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="sortValue"
                  placeholder="todo"
                  onInput={(e) =>
                    updateFormState(e.currentTarget.id, e.currentTarget.value)
                  }
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="description"
                  placeholder="A short sentence..."
                  onInput={(e) =>
                    updateFormState(e.currentTarget.id, e.currentTarget.value)
                  }
                />
              </div>
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="bg">Notes (optional)</Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="bg"
                  placeholder="red"
                  onInput={(e) =>
                    updateFormState(e.currentTarget.id, e.currentTarget.value)
                  }
                />
              </div>
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFormState(defaultFormState)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={(e) => handleFormSubmit(e)}>
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
