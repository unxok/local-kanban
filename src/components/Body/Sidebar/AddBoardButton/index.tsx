import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddBoardModal } from "../../Main/Board/AddBoardModal";

export const AddBoardButton = () => {
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <>
      <Button className="w-full" onClick={() => setFormOpen((prev) => !prev)}>
        Create new board
      </Button>
      {isFormOpen && <AddBoardModal open={isFormOpen} setOpen={setFormOpen} />}
    </>
  );
};
