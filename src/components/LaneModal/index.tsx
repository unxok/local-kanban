import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LaneConfig } from "@/localSave";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UpdateBoardsType } from "@/App";
import { toast } from "sonner";
import { useVariant } from "../VariantProvider";
import { cardVariants } from "../ui/card";

type LaneModalProps = {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  defaultData?: LaneConfig;
  updateBoards: UpdateBoardsType;
  boardId: string;
};

type UpdateFormStateType = (name: keyof LaneConfig, value: any) => void;

export const LaneModal = ({
  open,
  onOpenChange,
  defaultData,
  updateBoards,
  boardId,
}: LaneModalProps) => {
  const [formState, setFormState] = useState<Partial<LaneConfig> | undefined>(
    defaultData || {},
  );
  const [hasInvalid, setHasInvalid] = useState(false);
  const { variant } = useVariant();

  const updateFormState: UpdateFormStateType = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // TODO add zod validation?? I kind of have validation already, but really I should be validating here too right?
    // means we are updating
    if (defaultData) {
      updateBoards((prev) => {
        if (!prev) {
          toast.error("This should never happen! Check console");
          console.error("Tried to update a board when none exist");
          return undefined;
        }
        const copyPrev = [...prev];
        const foundBoardIndex = copyPrev.findIndex((b) => b.id === boardId);
        if (foundBoardIndex === -1) {
          toast.error("This should never happen! Check console");
          console.error("Couldn't find board you're trying to update.");
          return copyPrev;
        }
        if (!copyPrev[foundBoardIndex].lanes) {
          toast.error("This should never happen! Check console");
          console.error("Tried to update a lane when none exist");
          return copyPrev;
        }
        const foundLaneIndex = copyPrev[foundBoardIndex].lanes?.findIndex(
          (l) => l.sortValue === formState?.sortValue,
        );
        if (foundLaneIndex === -1) {
          toast.error("This should never happen! Check console");
          console.error("Couldn't find lane you're trying to update.");
          return copyPrev;
        }
        // @ts-ignore TODO typescipt being dumb
        copyPrev[foundBoardIndex].lanes[foundLaneIndex] =
          formState as LaneConfig;
        return copyPrev;
      });
    }
    // means we are creating new
    updateBoards((prev) => {
      const copyPrev = prev ? prev : undefined;
      if (!copyPrev) {
        toast.error("This should never happen! Check console");
        console.error("Tried adding a lane when no boards exist");
        return copyPrev;
      }
      const foundBoard = copyPrev.findIndex((b) => b.id === boardId);
      if (foundBoard === -1) {
        toast.error("This should never happen! Check console");
        console.error("Tried adding lane to non-existent board");
        return prev;
      }
      copyPrev[foundBoard].lanes = copyPrev[foundBoard].lanes
        ? copyPrev[foundBoard].lanes
        : [];
      const hasThisLaneAlready = copyPrev[foundBoard].lanes?.some(
        (l) => l.sortValue === formState?.sortValue,
      );
      if (hasThisLaneAlready) {
        toast.error("You already have a lane with that Sort Value!");
        e.preventDefault();
        return prev;
      }
      copyPrev[foundBoard]?.lanes?.push(formState as LaneConfig);
      return [...copyPrev];
    });
  };

  const handleFormDelete = () => {
    updateBoards((prev) => {
      if (!prev) {
        toast.error("This should never happen! Check console");
        console.error("Tried to delete a lane when no boards exist");
        return undefined;
      }
      const foundBoardIndex = prev.findIndex((b) => b.id === boardId);
      if (foundBoardIndex === -1) {
        toast.error("This should never happen! Check console");
        console.error("Tried deleting a lane from non-existent board");
        return prev;
      }
      const copyPrev = [...prev];
      copyPrev[foundBoardIndex].lanes = copyPrev[
        foundBoardIndex
      ]?.lanes?.filter((l) => l.sortValue !== formState?.sortValue);
      return copyPrev;
    });
  };

  useEffect(() => {
    console.log(formState);
    if (!formState?.title || !formState?.sortValue) return setHasInvalid(true);
    setHasInvalid(false);
  }, [formState]);
  // useEffect(() => console.log(hasInvalid), [hasInvalid]);

  return (
    <Dialog open={open} onOpenChange={(b) => onOpenChange(b)}>
      <DialogContent
        className={cardVariants({ variant: variant })}
        onFocusOutside={() => setFormState(undefined)}
      >
        <DialogHeader>
          <DialogTitle>
            {defaultData?.title
              ? `Updating ${defaultData.title} lane`
              : "New lane"}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            {!defaultData && <span>You can add cards after creation.</span>}
            <span>
              Confused?{" "}
              <a
                className="text-accent-foreground underline hover:cursor-pointer"
                href="https://github.com/unxok/local-kanban"
              >
                read the docs!
              </a>
            </span>
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <TitleInput formState={formState} updateFormState={updateFormState} />
          <SortValueInput
            formState={formState}
            updateFormState={updateFormState}
          />
          <DescriptionInput
            formState={formState}
            updateFormState={updateFormState}
          />
          {/* <NotesInput formState={formState} updateFormState={updateFormState} /> */}
        </form>
        <DialogFooter>
          {defaultData && <DeleteButton handleFormDelete={handleFormDelete} />}
          <DialogClose asChild>
            <Button
              disabled={hasInvalid}
              type="submit"
              onClick={(e) => handleFormSubmit(e)}
            >
              {defaultData ? "Update" : "Create"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TitleInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<LaneConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  const [isValid, setValidity] = useState(true);

  const checkValidity = () => {
    if (!formState?.title) {
      return setValidity(false);
    }
    setValidity(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        value={formState?.title || ""}
        placeholder={!isValid ? "required!" : "TO DO"}
        onInput={(e) => updateFormState("title", e.currentTarget.value)}
        onBlur={() => checkValidity()}
        onFocus={() => setValidity(true)}
        className={!isValid ? "border-destructive" : ""}
      />
    </div>
  );
};

const SortValueInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<LaneConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  const [isValid, setValidity] = useState(true);

  const checkValidity = () => {
    if (!formState?.sortValue) {
      return setValidity(false);
    }
    setValidity(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="sortValue">Sort Value</Label>
      <Input
        id="sortValue"
        type="text"
        value={formState?.sortValue || ""}
        placeholder={!isValid ? "required!" : "todo"}
        onInput={(e) => updateFormState("sortValue", e.currentTarget.value)}
        onBlur={() => checkValidity()}
        onFocus={() => setValidity(true)}
        className={!isValid ? "border-destructive" : ""}
      />
    </div>
  );
};

const DescriptionInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<LaneConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        type="text"
        value={formState?.description || ""}
        placeholder="do these tasks..."
        onInput={(e) => updateFormState("description", e.currentTarget.value)}
      />
    </div>
  );
};

// const NotesInput = ({
//   formState,
//   updateFormState,
// }: {
//   formState: Partial<LaneConfig> | undefined;
//   updateFormState: UpdateFormStateType;
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       <Label htmlFor="notes">Notes</Label>
//       <Input
//         id="notes"
//         type="text"
//         value={formState?.notes || ""}
//         placeholder="make sure to check throughout the day..."
//         onInput={(e) => updateFormState("notes", e.currentTarget.value)}
//       />
//     </div>
//   );
// };

const DeleteButton = ({
  handleFormDelete,
}: {
  handleFormDelete: () => void;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <DialogClose asChild>
        <Button
          variant={"destructiveGhost"}
          onClick={() => setModalOpen((prev) => !prev)}
        >
          Delete
        </Button>
      </DialogClose>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently your board
                from save data.
              </DialogDescription>
              <DialogFooter>
                <Button variant={"ghost"}>Acutally, nevermind</Button>
                <Button
                  variant={"destructive"}
                  onClick={() => handleFormDelete()}
                >
                  Yes, I am sure
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
