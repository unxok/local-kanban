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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { BoardConfig } from "../../Main";
import { useSaveContext } from "@/components/SaveProvider";

const defaultFormState: BoardConfig = {
  title: "Unnamed Board",
  sortProperty: "status",
};

export const AddBoardButton = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);
  const { updateBoard } = useSaveContext();

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const updateFormState = (id: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = () => {
    updateBoard(formState);
  };

  return (
    <>
      <Button className="w-full" onClick={() => setFormOpen((prev) => !prev)}>
        Create new board
      </Button>
      <AlertDialog
        open={isFormOpen}
        onOpenChange={() => setFormOpen((prev) => !prev)}
      >
        {isFormOpen && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create new board</AlertDialogTitle>
              <AlertDialogDescription>
                You can add cards after creating the board.
              </AlertDialogDescription>
              <form action="" className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="title"
                    placeholder="Unnamed Board"
                    onInput={(e) =>
                      updateFormState(e.currentTarget.id, e.currentTarget.value)
                    }
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="sortProperty">Sort Property</Label>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="sortProperty"
                    placeholder="status"
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
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="notes"
                    placeholder="Markdown supported..."
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
    </>
  );
};
