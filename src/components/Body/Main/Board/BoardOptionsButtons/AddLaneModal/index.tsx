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
}: {
  boardConfig: BoardConfig;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}) => {
  const [formState, setFormState] = useState(defaultFormState);
  const { updateBoard } = useSaveContext();

  const updateFormState = (id: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = () => {
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
            <AlertDialogAction onClick={() => handleFormSubmit()}>
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
