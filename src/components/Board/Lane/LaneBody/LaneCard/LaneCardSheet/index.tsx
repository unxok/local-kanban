import { CardProps } from "@/components/Board";
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

export const LaneCardSheet = ({
  id,
  title,
  description,
  tags,
  properties,
  text,
}: CardProps) => {
  const [cardText, setCardText] = useState(text);
  const [stagedCardData, setStagedCardData] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const updateCardText = (newText: string) => {
    setCardText(newText);
  };

  return (
    <Sheet>
      <SheetTrigger
        className={buttonVariants({ variant: "link", size: "lg" }) + `p-0`}
      >
        {title}
      </SheetTrigger>
      {isEditing ? (
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
          <SheetTitle>Notes</SheetTitle>
          <Textarea
            value={stagedCardData || ""}
            onChange={(e) => setStagedCardData(e.target.value)}
          />

          <SheetFooter>
            <Button
              variant={"ghost"}
              onClick={() => {
                setIsEditing(false);
                setStagedCardData(cardText);
              }}
            >
              <Cross2Icon height={20} width={20} color="red" />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                setIsEditing(false);
                updateCardText(stagedCardData || "");
              }}
            >
              <CheckIcon height={20} width={20} color="limegreen" />
            </Button>
          </SheetFooter>
        </SheetContent>
      ) : (
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
          <SheetTitle>Notes</SheetTitle>
          <div>{cardText}</div>

          <SheetFooter>
            <Button variant={"ghost"} onClick={() => setIsEditing(true)}>
              <Pencil2Icon height={20} width={20} />
            </Button>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};
