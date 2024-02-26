import { buttonVariants, Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { LaneCardProperties } from "./LaneCardProperties";
import { useState } from "react";
import { CheckIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { CardProps, useCards } from "@/components/CardsProvider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const LaneCardSheet = ({
  id,
  title,
  description,
  text,
  tags,
  properties,
}: CardProps) => {
  const [stagedCardData, setStagedCardData] = useState({
    id,
    title,
    description,
    text,
    tags,
    properties,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={(bool) => setSheetOpen(bool)}>
      <SheetTrigger
        className={buttonVariants({ variant: "link", size: "lg" }) + `p-0`}
      >
        {title}
      </SheetTrigger>
      {isEditing ? (
        <EditableSheet
          id={id}
          title={title}
          description={description}
          properties={properties}
          tags={tags}
          text={text}
          stagedCardData={stagedCardData}
          setStagedCardData={setStagedCardData}
          setIsEditing={setIsEditing}
        />
      ) : (
        <StaticSheet
          id={id}
          title={title}
          description={description}
          properties={properties}
          tags={tags}
          text={text}
          setIsEditing={setIsEditing}
        />
      )}
    </Sheet>
  );
};

type StaticSheetProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
} & CardProps;

export const StaticSheet = (props: StaticSheetProps) => {
  const { id, title, description, tags, properties, text, setIsEditing } =
    props;
  const { setCardById } = useCards();
  const handleFieldUpdate = (e: React.FormEvent<HTMLInputElement>) => {
    const field = e.currentTarget.id;
    const value = e.currentTarget.value;
    const newCardData = { ...props, [field]: value };
    // @ts-ignore
    delete newCardData.setIsEditing;
    console.log("new card data: ", newCardData);
    setCardById(id, newCardData);
  };
  return (
    <SheetContent side="bottom" className="accent-primary">
      <SheetHeader>
        <SheetTitle>
          {/* <Input type="text" defaultValue={title} /> */}
          <input
            className="bg-inherit text-inherit placeholder-inherit"
            defaultValue={title}
            id="title"
            onInput={(e) => handleFieldUpdate(e)}
          />
          {/* {title} */}
        </SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-3 pt-2">
        <p className="flex flex-row gap-2">
          {tags && tags.map((t) => <Badge key={t}>{t}</Badge>)}
        </p>
        <LaneCardProperties cardId={id} properties={properties} />
      </div>
      <div className="flex flex-col gap-3 py-5">
        <SheetTitle>Notes</SheetTitle>
        <div>{text}</div>

        <SheetFooter>
          <Button variant={"ghost"} onClick={() => setIsEditing(true)}>
            <Pencil2Icon height={20} width={20} />
          </Button>
        </SheetFooter>
      </div>
    </SheetContent>
  );
};

type EditableSheetProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  stagedCardData: CardProps;
  setStagedCardData: React.Dispatch<React.SetStateAction<any>>;
} & CardProps;
export const EditableSheet = ({
  id,
  title,
  description,
  tags,
  properties,
  text,
  setIsEditing,
  stagedCardData,
  setStagedCardData,
}: EditableSheetProps) => {
  const { cards, setCardById } = useCards();
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-3 pt-2">
        <p className="flex flex-row gap-2">
          {tags &&
            tags.map((t) => (
              <Button
                key={t}
                variant={"secondary"}
                className="h-fit rounded-lg px-2 py-1 text-xs text-primary"
              >
                {t}
              </Button>
            ))}
        </p>
        <LaneCardProperties cardId={id} properties={properties} />
      </div>
      <div className="flex flex-col gap-3 py-5">
        <Separator />
        <SheetTitle>Notes</SheetTitle>
        <Textarea
          value={text || ""}
          onChange={(e) => setStagedCardData(e.target.value)}
        />

        <SheetFooter>
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsEditing(false);
              setStagedCardData(cards);
            }}
          >
            <Cross2Icon height={20} width={20} color="red" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsEditing(false);
              setCardById(id, stagedCardData);
            }}
          >
            <CheckIcon height={20} width={20} color="limegreen" />
          </Button>
        </SheetFooter>
      </div>
    </SheetContent>
  );
};
