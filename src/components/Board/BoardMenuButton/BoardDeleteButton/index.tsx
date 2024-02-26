 
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export const BoardDeleteButton = ({boardConfig, updateBoardConfig}:{boardConfig: any; updateBoardConfig: any}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`w-full ${buttonVariants({ variant: "destructive", size: "sm" })}`}
      >
        delete board
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            board and remove it's data entirely.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive", size: "sm" })}
            onClick={() => updateBoardConfig(boardConfig.id, boardConfig, true)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
