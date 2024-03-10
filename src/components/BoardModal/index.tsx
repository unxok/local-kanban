import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BoardConfig } from "@/localSave";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { UpdateBoardsType } from "@/App";
import { toast } from "sonner";

type BoardModalProps = {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  defaultData?: BoardConfig;
  updateBoards: UpdateBoardsType;
};

type UpdateFormStateType = (name: keyof BoardConfig, value: any) => void;

export const BoardModal = ({
  open,
  onOpenChange,
  defaultData,
  updateBoards,
}: BoardModalProps) => {
  const [formState, setFormState] = useState<Partial<BoardConfig> | undefined>(
    defaultData || {
      id: uuidv4(),
    },
  );
  const [hasInvalid, setHasInvalid] = useState(false);

  const updateFormState: UpdateFormStateType = (name, value) => {
    console.log("im here");
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
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
        const foundBoardIndex = copyPrev.findIndex(
          (b) => b.id === formState?.id,
        );
        if (!foundBoardIndex) {
          toast.error("This should never happen! Check console");
          console.error("Couldn't find board you're trying to update.");
          return copyPrev;
        }
        copyPrev[foundBoardIndex] = formState as BoardConfig;
        return copyPrev;
      });
    }

    // means we are creating new
    updateBoards((prev) => {
      const copyPrev = prev ? [...prev] : [];
      return [...copyPrev, formState as BoardConfig];
    });
  };

  const handleFormDelete = () => {
    updateBoards((prev) => {
      if (!prev) {
        toast.error("This should never happen! Check console");
        console.error("Tried to delete a board when none exist");
        return undefined;
      }
      return prev.filter((b) => b.id !== formState?.id);
    });
  };

  useEffect(() => {
    console.log(formState);
    if (!formState?.title || !formState?.sortProperty)
      return setHasInvalid(true);
    setHasInvalid(false);
  }, [formState]);
  // useEffect(() => console.log(hasInvalid), [hasInvalid]);

  return (
    <Dialog open={open} onOpenChange={(b) => onOpenChange(b)}>
      <DialogContent onFocusOutside={() => setFormState(undefined)}>
        <DialogHeader>
          <DialogTitle>
            {defaultData?.title
              ? `Updating ${defaultData.title} board`
              : "New board"}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            {!defaultData && (
              <span>You can add lanes and cards after creation.</span>
            )}
            <span>
              Confused?{" "}
              <a
                className="text-primary hover:cursor-pointer hover:underline"
                href="https://github.com/unxok/local-kanban"
              >
                read the docs!
              </a>
            </span>
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <TitleInput formState={formState} updateFormState={updateFormState} />
          <SortPropertyInput
            formState={formState}
            updateFormState={updateFormState}
          />
          <DescriptionInput
            formState={formState}
            updateFormState={updateFormState}
          />
          <NotesInput formState={formState} updateFormState={updateFormState} />
        </form>
        <DialogFooter>
          {defaultData && <DeleteButton handleFormDelete={handleFormDelete} />}
          <Button
            disabled={hasInvalid}
            type="submit"
            onClick={handleFormSubmit}
          >
            {defaultData ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TitleInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<BoardConfig> | undefined;
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
        placeholder={!isValid ? "required!" : "My Tasks..."}
        onInput={(e) => updateFormState("title", e.currentTarget.value)}
        onBlur={() => checkValidity()}
        onFocus={() => setValidity(true)}
        className={!isValid ? "border-destructive" : ""}
      />
    </div>
  );
};

const SortPropertyInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<BoardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  const [isValid, setValidity] = useState(true);

  const checkValidity = () => {
    if (!formState?.sortProperty) {
      return setValidity(false);
    }
    setValidity(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="sortProperty">Sort Property</Label>
      <Input
        id="sortProperty"
        type="text"
        value={formState?.sortProperty || ""}
        placeholder={!isValid ? "required!" : "status"}
        onInput={(e) => updateFormState("sortProperty", e.currentTarget.value)}
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
  formState: Partial<BoardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        type="text"
        value={formState?.description || ""}
        placeholder="my tasks for the day..."
        onInput={(e) => updateFormState("description", e.currentTarget.value)}
      />
    </div>
  );
};

const NotesInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<BoardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        type="text"
        value={formState?.notes || ""}
        placeholder="make sure to check throughout the day..."
        onInput={(e) => updateFormState("notes", e.currentTarget.value)}
      />
    </div>
  );
};

const DeleteButton = ({
  handleFormDelete,
}: {
  handleFormDelete: () => void;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant={"destructiveGhost"}
        onClick={() => setModalOpen((prev) => !prev)}
      >
        Delete
      </Button>
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
