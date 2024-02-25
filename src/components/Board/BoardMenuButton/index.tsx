import { buttonVariants } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { BoardProps } from "..";
import { BoardDeleteButton } from "./BoardDeleteButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const BoardMenuButton = (props: BoardProps) => {
  const { title } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        <HamburgerMenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title} Board</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Add Lane</DropdownMenuItem>
        <DropdownMenuItem>Export</DropdownMenuItem>
        <DropdownMenuItem>Import</DropdownMenuItem>
        <DropdownMenuSeparator />

        <BoardDeleteButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
