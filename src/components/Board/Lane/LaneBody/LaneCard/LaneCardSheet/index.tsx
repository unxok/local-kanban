import { buttonVariants } from "@/components/ui/button";
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
import { Pencil2Icon } from "@radix-ui/react-icons";
import { CardProps } from "@/components/CardsProvider";
import { Badge } from "@/components/ui/badge";
import { NewCardButton } from "../../../LaneFooter";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LaneCardSheet = (
  props: CardProps & {
    sortProperty: string;
    laneId: string;
    laneTitle: string;
  },
) => {
  const {
    id,
    title,
    description,
    text,
    tags,
    properties,
    sortProperty,
    laneId,
    laneTitle,
  } = props;
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={(bool) => setSheetOpen(bool)}>
      <SheetTrigger className="text-primary hover:underline hover:underline-offset-4">
        {title}
      </SheetTrigger>

      <SheetContent side="bottom" className="accent-primary">
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle>
              <div
                className={`flex flex-row items-start px-0 py-3 text-primary hover:underline hover:underline-offset-4`}
              >
                {title}
              </div>
            </SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-row gap-2">
              {tags && tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
            <LaneCardProperties cardId={id} properties={properties} />
          </div>
          <div className="flex flex-col gap-3 py-5">
            <SheetTitle>Notes</SheetTitle>
            <div className="whitespace-pre-line">{text}</div>
          </div>
        </ScrollArea>

        <SheetFooter>
          <NewCardButton
            laneId={laneId}
            laneTitle={laneTitle}
            sortProperty={sortProperty}
            defaultCardData={props}
          >
            <div className={`flex flex-row justify-end `}>
              <div className={buttonVariants({ variant: "ghost" })}>
                <Pencil2Icon height={20} width={20} />
              </div>
            </div>
          </NewCardButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
