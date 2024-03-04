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
export const BoardOptionsButton = ({
  // boardConfig,
  setLaneModalOpen,
}: {
  boardConfig: BoardConfig;
  setLaneModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
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
        <DropdownMenuItem
          className="w-full"
          onClick={() => setLaneModalOpen((prev) => !prev)}
        >
          Add lane
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Delete board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
