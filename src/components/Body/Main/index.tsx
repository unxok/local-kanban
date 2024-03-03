import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const fakeCards: LaneCardConfig[] = [
  {
    title: "Take out trash",
    description: "unless not empty",
    notes: "trash day on Thursdays",
    tags: ["task", "gross"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Buy groceries",
    description: "for the week",
    notes: "remember to check for discounts",
    tags: ["task", "costco"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Finish coding assignment",
    description: "due by Friday",
    notes: "test thoroughly before submission",
    tags: ["coding", "school"],
    properties: {
      status: "todo",
    },
  },
  {
    title: "Call mom",
    description: "check in and catch up",
    notes: "she's been feeling unwell lately",
    tags: ["family"],
    properties: {
      status: "backlog",
    },
  },
  {
    title: "Exercise",
    description: "at least 30 minutes",
    notes: "try a new workout routine",
    properties: {
      status: "done",
    },
  },
];

const fakeLanes: LaneConfig[] = [
  {
    title: "BACKLOG",
    sortValue: "backlog",
  },
  {
    title: "TO DO",
    description: "Things to do",
    sortValue: "todo",
  },
  {
    title: "DONE",
    sortValue: "done",
  },
];

const fakeBoards: BoardConfig[] = [
  {
    title: "General Tasks",
    sortProperty: "status",
    lanes: fakeLanes,
    description: "my general list of to do items",
    notes: "here are some random notes",
  },
];

export const Main = () => (
  <ResizablePanel
    className="relative flex h-full flex-col items-center justify-start gap-3 p-3"
    id="main"
  >
    <ScrollArea className="w-full">
      {fakeBoards.map((b) => (
        <Board key={b.title} {...b} />
      ))}
    </ScrollArea>
  </ResizablePanel>
);

type LaneCardConfig = {
  title: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
  notes?: string;
};
type LaneConfig = {
  title: string;
  sortValue: string;
  description?: string;
  bg?: string;
};
type BoardConfig = {
  title: string;
  sortProperty: string;
  lanes?: LaneConfig[];
  description?: string;
  notes?: string;
};
export const Board = (props: BoardConfig) => {
  const { title, sortProperty, lanes, description, notes } = props;
  return (
    <Card className="w-full">
      <div className="flex flex-row justify-between">
        <CardHeader className="w-full">
          <div className="flex flex-row justify-between">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <BoardOptionsButton />
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      </div>
      <CardContent>
        {notes && <p>{notes}</p>}
        <br />
        <div className="flex flex-row items-start justify-center gap-2">
          {lanes ? (
            lanes.map((l) => (
              <Lane key={l.title} {...l} sortProperty={sortProperty} />
            ))
          ) : (
            <div>No boards yet...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const BoardOptionsButton = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <DropdownMenu
      open={isMenuOpen}
      onOpenChange={() => setMenuOpen((prev) => !prev)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:text-primary"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <DotsVerticalIcon height={20} width={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Board options</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Edit details</DropdownMenuItem>
        <DropdownMenuItem>Add lane</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Delete board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Lane = (props: LaneConfig & { sortProperty: string }) => {
  const { title, sortProperty, sortValue } = props;
  const description = props.description ? props.description : undefined;
  const bg = props.bg ? props.bg : undefined;
  const cards = fakeCards.filter(
    (c) => c.properties && c?.properties[sortProperty] === sortValue,
  );
  return (
    <Card className="basis-full">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ? description : <br />}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-center px-2">
        <LaneCardSeparator />
        {cards.map((c) => (
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
    </Card>
  );
};

export const LaneCardSeparator = () => {
  //
  return (
    <div className="h-1 w-3/4 self-center rounded-full hover:bg-primary" />
  );
};

export const LaneCard = (props: LaneCardConfig) => {
  const { title } = props;
  const description = props.description ? props.description : undefined;
  const tags = props.tags ? props.tags : undefined;
  const properties = props.properties ? props.properties : undefined;
  const notes = props.notes ? props.notes : undefined;
  return (
    <Card className="w-full basis-full">
      <CardHeader className="p-4 pb-1">
        <CardTitle className="line-clamp-1 text-primary">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description ? description : <br />}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        {tags ? <CardTags tags={tags} /> : <br />}
      </CardContent>
    </Card>
  );
};

export const CardTags = ({ tags }: { tags: string[] }) => (
  <div className="line-clamp-1 flex flex-row items-center justify-start gap-1">
    {tags.map((t) => (
      <Badge className="font-normal" key={t}>
        {t}
      </Badge>
    ))}
  </div>
);
