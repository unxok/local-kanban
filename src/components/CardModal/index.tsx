import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardConfig } from "@/localSave";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { UpdateCardsType } from "@/App";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type CardModalProps = {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  defaultData?: CardConfig;
  updateCards: UpdateCardsType;
};

type UpdateFormStateType = (name: keyof CardConfig, value: any) => void;

export const CardModal = ({
  open,
  onOpenChange,
  defaultData,
  updateCards,
}: CardModalProps) => {
  const [formState, setFormState] = useState<Partial<CardConfig> | undefined>(
    defaultData || {
      id: uuidv4(),
    },
  );
  const [hasInvalid, setHasInvalid] = useState(false);

  const updateFormState: UpdateFormStateType = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    // TODO add zod validation?? I kind of have validation already, but really I should be validating here too right?
    // means we are updating
    // if (defaultData) {
    //   updateBoards((prev) => {
    //     if (!prev) {
    //       toast.error("This should never happen! Check console");
    //       console.error("Tried to update a board when none exist");
    //       return undefined;
    //     }
    //     const copyPrev = [...prev];
    //     const foundBoardIndex = copyPrev.findIndex(
    //       (b) => b.id === formState?.id,
    //     );
    //     if (foundBoardIndex === -1) {
    //       toast.error("This should never happen! Check console");
    //       console.error("Couldn't find board you're trying to update.");
    //       return copyPrev;
    //     }
    //     copyPrev[foundBoardIndex] = formState as CardConfig;
    //     return copyPrev;
    //   });
    // }
    // // means we are creating new
    // updateBoards((prev) => {
    //   const copyPrev = prev ? [...prev] : [];
    //   return [...copyPrev, formState as CardConfig];
    // });
  };

  const handleFormDelete = () => {
    updateCards((prev) => {
      if (!prev) {
        toast.error("This should never happen! Check console");
        console.error("Tried to delete a board when none exist");
        return undefined;
      }
      return prev.filter((b) => b.id !== formState?.id);
    });
  };

  useEffect(() => {
    // if (!formState?.title || !formState?.sortProperty)
    //   return setHasInvalid(true);
    // setHasInvalid(false);
    console.log(formState);
  }, [formState]);
  // useEffect(() => console.log(hasInvalid), [hasInvalid]);

  return (
    <Dialog open={open} onOpenChange={(b) => onOpenChange(b)}>
      <DialogContent onFocusOutside={() => setFormState(undefined)}>
        <DialogHeader>
          <DialogTitle>
            {defaultData?.title
              ? `Updating ${defaultData.title} board`
              : "New card"}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            {!defaultData && <span>Do not remove the default property!</span>}
            <span>
              Confused?{" "}
              <a
                className="text-foreground underline hover:cursor-pointer"
                href="https://github.com/unxok/local-kanban"
              >
                Read the docs!
              </a>
            </span>
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <TitleInput formState={formState} updateFormState={updateFormState} />
          <DescriptionInput
            formState={formState}
            updateFormState={updateFormState}
          />
          <TagsInput formState={formState} updateFormState={updateFormState} />
          <PropertiesInput
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
  formState: Partial<CardConfig> | undefined;
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
        placeholder={!isValid ? "required!" : "Do a thing..."}
        onInput={(e) => updateFormState("title", e.currentTarget.value)}
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
  formState: Partial<CardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        type="text"
        value={formState?.description || ""}
        placeholder="Need to do this thing..."
        onInput={(e) => updateFormState("description", e.currentTarget.value)}
      />
    </div>
  );
};

const TagsInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<CardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  const [tagString, setTagString] = useState(formState?.tags?.join(", ") || "");
  useEffect(() => {
    const tags = tagString.split(",").map((t) => t.trim());
    updateFormState("tags", tags);
  }, [tagString]);
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="tags">Tags</Label>
      <Input
        id="tags"
        type="text"
        value={tagString}
        placeholder="task, thing, ..."
        onInput={(e) => setTagString(e.currentTarget.value)}
      />
    </div>
  );
};

const objToString = (obj: Record<string, string>) => {
  const keys = Object.keys(obj);
  const str = keys
    .map((key) => {
      return `${key}: ${obj[key]}`;
    })
    .join(", ");

  return str;
};

const strToObject = (str: string) => {
  const arr = str.split(",");
  const obj = arr.reduce((acc, pair) => {
    const [key, val] = pair
      .trim()
      .split(":")
      .map((pv) => pv.trim());
    return {
      ...acc,
      [key]: val,
    };
  }, {});
  return obj;
};

const PropertiesInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<CardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  const [propString, setPropString] = useState(
    objToString(formState?.properties || {}) || "",
  );

  useEffect(() => {
    const props = strToObject(propString);
    updateFormState("properties", props);
  }, [propString]);
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="properties">Properties</Label>
      <Input
        id="properties"
        type="text"
        value={propString}
        placeholder="status: todo, name: value, ..."
        onInput={(e) => setPropString(e.currentTarget.value)}
      />
    </div>
  );
};

const NotesInput = ({
  formState,
  updateFormState,
}: {
  formState: Partial<CardConfig> | undefined;
  updateFormState: UpdateFormStateType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        value={formState?.notes || ""}
        placeholder="Some notes about doing a thing..."
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
