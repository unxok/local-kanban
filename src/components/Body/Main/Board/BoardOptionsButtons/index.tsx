import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { BoardConfig } from "../..";
import { useSaveContext } from "@/components/SaveProvider";
export const BoardOptionsButton = ({
  boardConfig,
  setLaneModalOpen,
  setBoardModalOpen,
}: {
  boardConfig: BoardConfig;
  setLaneModalOpen: (value: React.SetStateAction<boolean>) => void;
  setBoardModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { deleteBoard } = useSaveContext();
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
        <DropdownMenuItem
          className="w-full"
          onClick={() => setBoardModalOpen((prev) => !prev)}
        >
          Edit board
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full"
          onClick={() => setLaneModalOpen((prev) => !prev)}
        >
          Add lane
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full text-destructive"
          onClick={() => deleteBoard(boardConfig.title)}
        >
          Delete board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
