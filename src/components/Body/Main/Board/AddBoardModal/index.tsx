import { useSaveContext } from "@/components/SaveProvider";
import { BoardConfig } from "../..";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const defaultFormState: BoardConfig = {
  title: "Unnamed Board",
  sortProperty: "status",
};

export const AddBoardModal = ({
  open,
  setOpen,
  defaultData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultData?: BoardConfig;
}) => {
  const [errMsgArr, setErrMsgArr] = useState<string[] | null>(null);
  const { updateBoard, checkDuplicate } = useSaveContext();
  const [formState, setFormState] = useState(defaultData || defaultFormState);
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
    if (!formState.sortProperty)
      errors.push("Must have a non-blank Sort Property");
    if (!defaultData && checkDuplicate("board", formState.title))
      errors.push(`Board title "${formState.title}" is already in use`);
    if (errors.length) {
      setErrMsgArr(errors);
      e.preventDefault();
      return;
    }
    updateBoard(formState);
  };
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      {open && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create new board</AlertDialogTitle>
            <AlertDialogDescription>
              You can add cards after creating the board.
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
                  placeholder={defaultData?.title || "Unnamed Board"}
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
                  placeholder={defaultData?.sortProperty || "status"}
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
                  placeholder={
                    defaultData?.description || "A short sentence..."
                  }
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
                  placeholder={defaultData?.notes || "Markdown supported..."}
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
              {defaultData ? "Update" : "Create"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
