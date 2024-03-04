import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LaneCardConfig } from "../../..";
import { CardTags } from "./CardTags";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { LaneCardSeparator } from "../LaneCardSeparator";
import { useSaveContext } from "@/components/SaveProvider";

export const LaneCard = (
  props: LaneCardConfig & {
    layoutId: string;
  },
) => {
  const { title, layoutId } = props;
  const { setActiveCardId } = useSaveContext();
  const description = props.description ? props.description : undefined;
  const tags = props.tags ? props.tags : undefined;
  // const properties = props.properties ? props.properties : undefined;
  // const notes = props.notes ? props.notes : undefined;

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setActiveAsBefore(title, e);
  // };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("I was dragged over!", ac);
    if (title === e?.dataTransfer.getData("draggedId"))
      return setActiveCardId(undefined);
    setActiveCardId(title);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData("draggedId");
    e.dataTransfer.setData("draggedId", title);
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      className="flex w-full flex-col items-center justify-center"
    >
      <LaneCardSeparator data-card-id={title} beforeCardId={title} />
      <Card
        draggable
        onDragOver={(e) => handleDragOver(e)}
        onDragStart={(e) => handleDragStart(e)}
        className="w-full basis-full hover:cursor-grab hover:active:cursor-grabbing"
      >
        <CardHeader className="p-4 pb-1">
          <CardTitle className="line-clamp-1 text-primary">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {description ? description : <br />}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-between p-4 pt-1">
          <div>{tags ? <CardTags tags={tags} /> : <br />}</div>
          <div className="flex flex-row items-end">
            <DotsHorizontalIcon />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
