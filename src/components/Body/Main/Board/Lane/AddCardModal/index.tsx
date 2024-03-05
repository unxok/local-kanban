import { useSaveContext } from "@/components/SaveProvider";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { LaneCardConfig, BoardConfig } from "../../..";
import { Label } from "@/components/ui/label";

const defaultFormState: LaneCardConfig = {
  title: "Unnamed card",
};
export const AddCardModal = ({
  boardConfig,
  open,
  onOpenChange,
  defaultSortValue,
  defaultData,
}: {
  boardConfig: BoardConfig;
  open: boolean;
  onOpenChange: (b: boolean) => void;
  defaultSortValue: string;
  defaultData?: LaneCardConfig;
}) => {
  const [formState, setFormState] = useState(defaultData || defaultFormState);
  const [errMsgArr, setErrMsgArr] = useState<string[] | null>(null);
  const { updateBoard, checkDuplicate } = useSaveContext();

  useEffect(() => console.log(formState), [formState]);

  const updateFormState = (
    id: string,
    value: string | string[] | Record<string, string>,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const errors = [];
    const matchedValue = formState?.properties?.[boardConfig.sortProperty];
    if (!matchedValue)
      errors.push("Card doesn't have value matching sortProperty");
    const matchedLane = boardConfig?.lanes?.find(
      (l) => l.sortValue === matchedValue,
    );
    if (!matchedLane)
      errors.push("Card's matched sortValue doesn't match any lanes");
    if (!boardConfig.lanes)
      errors.push("Error: Board has no lanes. You should never see this");
    if (!formState.title) errors.push("Must have non-blank Title");
    if (checkDuplicate("card", formState.title, boardConfig.title))
      errors.push(`Board title "${formState.title}" is already in use`);
    if (errors.length) {
      setErrMsgArr(errors);
      e.preventDefault();
      return;
    }
    const foundCards = boardConfig.cards ? boardConfig.cards : [];
    const newBoardState = {
      ...boardConfig,
      cards: [...foundCards, formState],
    };
    updateBoard(newBoardState);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a new card</AlertDialogTitle>
            <AlertDialogDescription>
              Be sure to set a property and value corresponding with your board
              and one of your lane's settings
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
                  placeholder="Unnamed Card"
                  onInput={(e) =>
                    updateFormState(e.currentTarget.id, e.currentTarget.value)
                  }
                />
              </div>

              <PropertiesInput
                defaultSortValue={defaultSortValue}
                sortProperty={boardConfig.sortProperty}
                updateFormState={updateFormState}
              />
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input
                  className="w-1/2"
                  type="text"
                  id="tags"
                  placeholder="todo, task, a thing, etc ..."
                  onInput={(e) => {
                    const value = e.currentTarget.value
                      .split(",")
                      .map((t) => t.trim());
                    updateFormState(e.currentTarget.id, value);
                  }}
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
                <Textarea
                  className="w-1/2"
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

export const PropertiesInput = ({
  defaultSortValue,
  sortProperty,
  updateFormState,
}: {
  defaultSortValue: string;
  sortProperty: string;
  updateFormState: (
    id: string,
    value: string | string[] | Record<string, string>,
  ) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>(
    defaultSortValue && `${sortProperty}: ${defaultSortValue}`,
  );
  useEffect(
    () =>
      updateFormState("properties", {
        [sortProperty]: defaultSortValue,
      }),
    [],
  );
  return (
    <div className="flex flex-row items-center justify-between">
      <Label htmlFor="properties">
        <div>Properties</div>
        <div className="text-sm text-primary">{sortProperty}</div>
      </Label>
      <Input
        className="w-1/2"
        type="text"
        id="properties"
        // placeholder="todo"
        value={inputValue}
        onInput={(e) => {
          setInputValue(e.currentTarget.value);
          const value = e.currentTarget.value
            .split(",")
            .map((pv) => pv.trim())
            .reduce<Record<string, string>>((acc, val) => {
              const [propName, propValue] = val.split(":").map((v) => v.trim());
              return {
                ...acc,
                [propName]: propValue,
              };
            }, {});
          updateFormState(e.currentTarget.id, value);
        }}
      />
    </div>
  );
};
