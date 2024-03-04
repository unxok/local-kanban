import { useSaveContext } from "@/components/SaveProvider";
import { motion } from "framer-motion";

export const LaneCardSeparator = ({
  beforeCardId,
}: {
  beforeCardId: string;
}) => {
  const { activeCardId, setActiveCardId } = useSaveContext();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e?.dataTransfer.getData("draggedId");
    console.log(`you dragged ${draggedId} over me, ${beforeCardId}`);
    if (beforeCardId === draggedId) return setActiveCardId(undefined);
    setActiveCardId(beforeCardId);
  };

  return (
    <motion.div
      layout
      onDragOver={(e) => handleDragOver(e)}
      // id={beforeCardId}
      // onDragEnd={handleDragEnd}
      className={`h-1 w-3/4 self-center rounded-full ${activeCardId === beforeCardId && "bg-primary"}`}
    />
  );
};
