import { UpdateBoardsType } from "@/App";
import { Variant } from "@/components/VariantProvider";
import { BoardModal } from "@/components/BoardModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddBoardButton = ({
  updateBoards,
  variant,
}: {
  updateBoards: UpdateBoardsType;
  variant: Variant;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        className="w-full"
        onClick={() => setModalOpen((prev) => !prev)}
      >
        Create new board
      </Button>
      {isModalOpen && (
        <BoardModal
          open={isModalOpen}
          onOpenChange={setModalOpen}
          updateBoards={updateBoards}
        />
      )}
    </>
  );
};
