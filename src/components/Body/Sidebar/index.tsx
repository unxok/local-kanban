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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResizablePanel } from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const Sidebar = () => (
  <ResizablePanel
    className="relative flex flex-col items-center justify-start gap-3 p-4"
    id="sidebar"
    collapsible
    collapsedSize={0}
    minSize={10}
  >
    <AddBoardButton />
    <Button disabled variant={"link"}>
      Create new view
    </Button>
  </ResizablePanel>
);

export const AddBoardButton = () => {
  const [isFormOpen, setFormOpen] = useState(false);
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
                  <Label htmlFor="titleInput">Title</Label>
                  <Input className="w-1/2" type="text" id="titleInput" />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="descriptionInput">
                    Description (optional)
                  </Label>
                  <Input className="w-1/2" type="text" id="descriptionInput" />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="notesInput">Notes (optional)</Label>
                  <Input className="w-1/2" type="text" id="notesInput" />
                </div>
              </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
};
