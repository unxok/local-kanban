import { BoardConfig, CardConfig } from "@/localSave";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cardVariants,
} from "@/components/ui/card";
import { Button } from "../ui/button";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LaneModal } from "../LaneModal";
import { UpdateBoardsType, UpdateCardsType } from "@/App";
import { Lane } from "../Lane";

export const Board = (
  props: BoardConfig & {
    updateBoards: UpdateBoardsType;
    cards: CardConfig[] | undefined;
    updateCards: UpdateCardsType;
  },
) => {
  const {
    id,
    sortProperty,
    title,
    description,
    lanes,
    notes,
    cards,
    updateCards,
  } = props;
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
      <CardContent>
        <div className="whitespace-pre">{notes}</div>
        <div className="flex flex-1 flex-row gap-2">
          {lanes ? (
            lanes.map((l) => (
              <Lane
                key={l.sortValue + id}
                boardId={id}
                {...l}
                cards={cards?.filter(
                  (c) => c.properties[sortProperty] === l.sortValue,
                )}
                updateCards={updateCards}
              />
            ))
          ) : (
            <div>
              No lanes yet... use the three dots on the right to add one!
            </div>
          )}
        </div>
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
  const { id, title, updateBoards } = props;
  const { variant } = useVariant();
  const [isLaneModalOpen, setLaneModalOpen] = useState(false);
  const [isBoardDeleteModalOpen, setBoardDeleteModalOpen] = useState(false);
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
          <DropdownMenuItem onClick={() => setBoardDeleteModalOpen((b) => !b)}>
            Delete
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
      <BoardDeleteModal
        boardId={id}
        boardTitle={title}
        updateBoards={updateBoards}
        open={isBoardDeleteModalOpen}
        onOpenChange={setBoardDeleteModalOpen}
      />
    </>
  );
};

const BoardDeleteModal = ({
  boardId,
  boardTitle,
  updateBoards,
  open,
  onOpenChange,
}: {
  boardId: string;
  boardTitle: string;
  updateBoards: UpdateBoardsType;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}) => {
  const { variant } = useVariant();

  if (!open) return;

  return (
    <Dialog open={open} onOpenChange={(b) => onOpenChange(b)}>
      <DialogTrigger className="transition-colors group-hover:text-destructive">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {boardTitle} board</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            board from your save data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Actually nevermind</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={variant}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/70"
              onClick={() => {
                updateBoards((prev) => {
                  if (!prev) return prev;
                  return prev.filter((b) => b.id !== boardId);
                });
              }}
            >
              Do it
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
