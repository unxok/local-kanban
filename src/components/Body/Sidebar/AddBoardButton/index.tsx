import { UpdateBoardsType } from "@/App";
import { BoardModal } from "@/components/BoardModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddBoardButton = ({
  updateBoards,
}: {
  updateBoards: UpdateBoardsType;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button className="w-full" onClick={() => setModalOpen((prev) => !prev)}>
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
