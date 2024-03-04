import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BoardConfig, LaneCardConfig, LaneConfig } from "../..";
import { LaneCard } from "./LaneCard";
import { Color, getBgColor, getBorderColor } from "@/utils";
import { useSaveContext } from "@/components/SaveProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { AddCardModal } from "./AddCardModal";

export const Lane = (props: LaneConfig & { boardConfig: BoardConfig }) => {
  const { title, sortValue, boardConfig } = props;
  const { sortProperty, cards } = boardConfig;
  const description = props.description ? props.description : undefined;
  const bg = props.bg ? props.bg : undefined;
  const filteredCards = cards?.filter(
    (c) => c.properties && c?.properties[sortProperty] === sortValue,
  );
  const bgColor = getBgColor((bg || "default") as Color);
  const borderColor = getBorderColor((bg || "default") as Color);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [defaultCardEditData, setDefaultCardEditData] =
    useState<LaneCardConfig>();
  const { activeCardId, setActiveCardId, updateBoard } = useSaveContext();

  useEffect(() => {
    if (defaultCardEditData) {
      setCardModalOpen(true);
      return;
    }
    setCardModalOpen(false);
    return;
  }, [defaultCardEditData]);

  // const setActiveAsBefore = (
  //   cardId: string,
  //   e?: React.DragEvent<HTMLDivElement>,
  // ) => {
  //   if (cardId === e?.dataTransfer.getData("draggedId")) {
  //     console.log("got same ");
  //     return setActiveCardId(undefined);
  //   }
  //   console.log("active id should be: ", cardId);
  //   const foundCardIndex = boardConfig.cards?.findIndex(
  //     (c) => c.title === cardId,
  //   );
  //   console.log("found i: ", foundCardIndex);
  //   if (foundCardIndex === -1) {
  //     // console.log("foundcard i asdfasdf: ", foundCardIndex);
  //     throw new Error(
  //       "Couldn't find card somehow... you should never see this.",
  //     );
  //   }
  //   if (!foundCardIndex && foundCardIndex !== 0) {
  //     // console.log("did you make it here?");
  //     return;
  //   }
  //   const beforeCardIndex = foundCardIndex - 1 < 0 ? 0 : foundCardIndex - 1;
  //   // console.log("before card: ", beforeCardIndex);
  //   setActiveCardId(boardConfig.cards?.[beforeCardIndex]?.title);
  // };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedId = e.dataTransfer.getData("draggedId");
    if (!draggedId) return;
    const foundDraggedCardData = boardConfig?.cards?.find(
      (c) => c.title === draggedId,
    );
    if (!foundDraggedCardData) return;
    // @ts-ignore TODO too bad typescript
    foundDraggedCardData.properties[sortProperty] = sortValue;
    const activeIndex =
      activeCardId === title
        ? -10
        : boardConfig?.cards?.findIndex((c) => c.title === activeCardId);
    if (!activeIndex && activeIndex !== 0) return;
    if (!boardConfig?.cards?.length && boardConfig?.cards?.length !== 0) return;
    const copyCards = [
      ...boardConfig.cards.filter(
        (c) => c.title !== foundDraggedCardData.title,
      ),
    ];

    console.log("active i ", activeIndex);
    const newCards =
      activeIndex === -10
        ? [...copyCards, foundDraggedCardData]
        : activeIndex === -1
          ? boardConfig.cards
          : activeIndex === 0
            ? [foundDraggedCardData, ...copyCards]
            : copyCards.splice(activeIndex - 1, 0, foundDraggedCardData) &&
              copyCards;
    console.log("new cards: ", newCards);
    updateBoard({
      ...boardConfig,
      cards: newCards,
    });
    setActiveCardId(undefined);
  };

  const startCardEdit = (cardId: string) => {
    const data = filteredCards?.find((c) => c.title === cardId);
    if (!data)
      throw new Error(
        "Error, trying to edit card that can't be found. You shouldn't be seeing this...",
      );
    setDefaultCardEditData(data);
  };

  return (
    <Card
      className={`basis-full border-none bg-transparent shadow-none`}
      onDrop={(e) => handleDrop(e)}
    >
      <CardHeader className="text-center">
        <CardTitle className="flex flex-row items-center justify-center gap-2 shadow-none">
          <div>{title}</div>
          <div className="text-muted-foreground">{filteredCards?.length}</div>
        </CardTitle>
        <CardDescription>{description ? description : <br />}</CardDescription>
      </CardHeader>
      <motion.div className={`rounded-[inherit]`}>
        <CardContent
          className={`flex flex-col items-start justify-center rounded-[inherit] border px-2 pb-0 ${bgColor} ${borderColor}`}
        >
          {filteredCards?.map((c) => (
            // <div
            //   key={`${c.title}-container`}
            //   className="flex w-full flex-col items-center justify-center"
            // >

            <LaneCard
              {...c}
              key={boardConfig.title + " " + title + " " + c.title}
              layoutId={boardConfig.title + " " + title + " " + c.title}
              startCardEdit={startCardEdit}
            />

            // </div>
          ))}
          <EmptyCardDropZone
            setActiveCardId={setActiveCardId}
            laneTitle={title}
          />
        </CardContent>
      </motion.div>
      <motion.div layout>
        <CardFooter className="gap-1 px-0 py-2">
          <Button
            variant={"outline"}
            onClick={() => setCardModalOpen((prev) => !prev)}
            className="w-3/4"
          >
            <PlusIcon />
          </Button>
          <Button variant={"outline"} className="w-1/4">
            <DotsVerticalIcon />
          </Button>
          {isCardModalOpen && (
            <AddCardModal
              boardConfig={boardConfig}
              open={isCardModalOpen}
              onOpenChange={setCardModalOpen}
              defaultSortValue={sortValue}
              defaultData={defaultCardEditData}
            />
          )}
        </CardFooter>
      </motion.div>
    </Card>
  );
};

export const EmptyCardDropZone = ({
  setActiveCardId,
  laneTitle,
}: {
  setActiveCardId: (value: React.SetStateAction<string | undefined>) => void;
  laneTitle: string;
}) => {
  const [isHighlight, setIsHighlight] = useState(false);
  return (
    <div
      className={`flex h-10 w-full items-start justify-center`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsHighlight(true);
        setActiveCardId(laneTitle);
      }}
      onDrop={() => setIsHighlight(false)}
      onDragLeave={() => setIsHighlight(false)}
      onDragExit={() => setIsHighlight(false)}
      onDragEnd={() => setIsHighlight(false)}
    >
      <div
        className={`h-1 w-3/4 rounded-full ${isHighlight ? "bg-primary" : "bg-none"}`}
      />
    </div>
  );
};
