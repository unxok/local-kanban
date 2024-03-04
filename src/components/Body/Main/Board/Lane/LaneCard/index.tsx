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

export const LaneCard = (props: LaneCardConfig) => {
  const { title } = props;
  const description = props.description ? props.description : undefined;
  const tags = props.tags ? props.tags : undefined;
  const properties = props.properties ? props.properties : undefined;
  const notes = props.notes ? props.notes : undefined;
  return (
    <Card
      draggable
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
  );
};
