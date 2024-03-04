import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BoardConfig, LaneCardConfig, LaneConfig, fakeCards } from "../..";
import { LaneCard } from "./LaneCard";
import { LaneCardSeparator } from "./LaneCardSeparator";
import { Color, getBgColor, getBorderColor } from "@/utils";
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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CrossCircledIcon,
  DotsVerticalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Lane = (props: LaneConfig & { boardConfig: BoardConfig }) => {
  const { title, sortValue, boardConfig } = props;
  const { sortProperty, cards } = boardConfig;
  const description = props.description ? props.description : undefined;
  const bg = props.bg ? props.bg : undefined;
  const filteredCards = cards?.filter(
    (c) => c.properties && c?.properties[sortProperty] === sortValue,
  );
  const bgColor = getBgColor((bg || "default") as Color);
  const borderColor = getBorderColor((bg || "default") as Color);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  return (
    <Card className={`basis-full border-none`}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ? description : <br />}</CardDescription>
      </CardHeader>
      <CardContent
        className={`flex flex-col items-start justify-center rounded-[inherit] border px-2 pb-20 ${bgColor} ${borderColor}`}
      >
        <LaneCardSeparator />
        {filteredCards?.map((c) => (
          <div
            key={`${c.title}-container`}
            className="flex w-full flex-col items-center justify-center"
          >
            <LaneCard {...c} key={c.title} />
            <LaneCardSeparator
              key={c.title + " separator"}
              data-card-id={c.title}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-1 px-0 py-2">
        <Button
          variant={"outline"}
          onClick={() => setCardModalOpen((prev) => !prev)}
          className="w-3/4"
        >
          <PlusIcon />
        </Button>
        <Button variant={"outline"} className="w-1/4">
          <DotsVerticalIcon />
        </Button>
        <AddCardModal
          boardConfig={boardConfig}
          open={isCardModalOpen}
          onOpenChange={setCardModalOpen}
          defaultSortValue={sortValue}
        />
      </CardFooter>
    </Card>
  );
};

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
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { updateBoard } = useSaveContext();

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

  const handleFormSubmit = () => {
    console.log("sortProperty", boardConfig.sortProperty);
    const matchedValue = formState?.properties?.[boardConfig.sortProperty];
    if (!matchedValue)
      throw new Error("Error: Card doesn't have value matching sortProperty");
    const matchedLane = boardConfig?.lanes?.find(
      (l) => l.sortValue === matchedValue,
    );
    if (!matchedLane)
      throw new Error(
        "Error: Card's matched sortValue doesn't match any lanes",
      );
    if (!boardConfig.lanes)
      throw new Error("Error: Board has no lanes. You should never see this");
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
            <form action="" className="flex flex-col gap-3">
              {errMsg && (
                <Alert variant={"destructive"}>
                  <CrossCircledIcon />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components and dependencies to your app using
                    the cli.
                  </AlertDescription>
                </Alert>
              )}
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
