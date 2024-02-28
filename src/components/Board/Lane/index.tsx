import { LaneFooter } from "./LaneFooter";
import { LaneHeader } from "./LaneHeader";
import { LaneBody } from "./LaneBody";
import { LaneConfig } from "..";
import { useCards } from "@/components/CardsProvider";

export const Lane = ({
  title,
  id,
  bg,
  sortProperty,
  updateBoardConfig,
  boardConfig
}: LaneConfig & { updateBoardConfig: string; boardConfig: any }) => {
  const { cards } = useCards();
  const filteredCardsLength = cards?.filter(
    // @ts-ignore TO DO
    (card) => card.properties[sortProperty] === id,
  ).length;
  return (
    <div className="flex w-0 flex-1 flex-col">
      <LaneHeader title={title} bg={bg} len={filteredCardsLength || 0} />
      <LaneBody title={title} id={id} bg={bg} sortProperty={sortProperty} />
      <LaneFooter laneTitle={title} laneId={id} sortProperty={sortProperty} updateBoardConfig={updateBoardConfig} boardConfig={boardConfig} />
      {/* instead of gap, place indicator component here */}
    </div>
  );
};
