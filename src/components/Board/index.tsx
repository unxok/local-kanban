import { BoardConfig } from "@/localSave";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cardVariants,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../ui/button";
import { useVariant } from "@/components/VariantProvider";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/utils";
import { LaneModal } from "../LaneModal";
import { UpdateBoardsType } from "@/App";
import { Lane } from "../Lane";

export const Board = (
  props: BoardConfig & { updateBoards: UpdateBoardsType },
) => {
  const { id, sortProperty, title, description, lanes, notes, styleConfig } =
    props;
  const { variant } = useVariant();
  return (
    <Card variant={variant} className="relative w-full">
      <BoardSettingsButton {...props} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="text-current">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-row gap-2">
        {lanes ? (
          lanes.map((l) => <Lane key={l.sortValue + id} boardId={id} {...l} />)
        ) : (
          <div>No lanes yet... use the three dots on the right to add one!</div>
        )}
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
        <Button variant={"modernRetro"} className="text-black">
          Im a button
        </Button>
      </CardFooter> */}
    </Card>
  );
};

const BoardSettingsButton = (
  props: BoardConfig & { updateBoards: UpdateBoardsType },
) => {
  const {
    id,
    sortProperty,
    title,
    description,
    lanes,
    notes,
    styleConfig,
    updateBoards,
  } = props;
  const { variant } = useVariant();
  const [isLaneModalOpen, setLaneModalOpen] = useState(false);
  return (
    <>
      <DropdownMenu
      // open={isDropdownOpen}
      // onOpenChange={(b) => setDropdownOpen(b)}
      >
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="absolute right-4 top-4">
            <DotsHorizontalIcon width={25} height={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cardVariants({ variant: variant })}
          side="left"
        >
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(_) => setLaneModalOpen((prev) => !prev)}>
            Add lane
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem>Import</DropdownMenuItem>
          <DropdownMenuItem className="group">
            <span className="transition-colors group-hover:text-destructive">
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isLaneModalOpen && (
        <LaneModal
          open={isLaneModalOpen}
          onOpenChange={(b) => setLaneModalOpen(b)}
          updateBoards={updateBoards}
          boardId={id}
        />
      )}
    </>
  );
};
