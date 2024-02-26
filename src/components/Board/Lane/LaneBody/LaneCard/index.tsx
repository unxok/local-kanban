import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CardProps } from "@/components/CardsProvider";
import { Badge } from "@/components/ui/badge";
import { LaneCardSheet } from "./LaneCardSheet";

export const LaneCard = (
  props: CardProps & {
    sortProperty: string;
    laneId: string;
    laneTitle: string;
  },
) => {
  const { id, title, sortProperty, laneId, laneTitle } = props;
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";
  const tags = props.tags ? props.tags : [];
  const properties = props.properties ? props.properties : [];

  return (
    <Card
      draggable
      className="relative hover:cursor-grab hover:border-primary active:hover:cursor-grabbing"
    >
      <CardHeader className="px-3 pb-1 pt-3">
        <CardTitle>
          {/* This is the sheet pop up with editable information */}
          <LaneCardSheet
            id={id}
            title={title}
            description={description}
            properties={properties}
            tags={tags}
            text={text}
            laneId={laneId}
            laneTitle={laneTitle}
            sortProperty={sortProperty}
          />
        </CardTitle>
        <CardDescription className="truncate text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-5/6 flex-row flex-wrap gap-2 px-3 py-2">
        {tags && tags.map((t) => <Badge key={t}>{t}</Badge>)}
      </CardContent>
      <CardFooter className="justify-end p-0">
        <Button className="absolute bottom-0 right-2 py-0" variant={"ghost"}>
          <DotsHorizontalIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};
