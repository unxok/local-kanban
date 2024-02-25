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
import { CardProps } from "../..";
import { LaneCardSheet } from "./LaneCardSheet";

export const LaneCard = (props: CardProps) => {
  const { id, title } = props;
  const description = props.description ? props.description : "";
  const text = props.text ? props.text : "";
  const tags = props.tags ? props.tags : [];
  const properties = props.properties ? props.properties : [];

  return (
    <Card
      draggable
      className="hover:border-primary relative hover:cursor-grab active:hover:cursor-grabbing"
    >
      <CardHeader>
        <CardTitle>
          <LaneCardSheet
            key={id + "-sheet"}
            id={id}
            title={title}
            description={description}
            properties={properties}
            tags={tags}
            text={text}
          />
        </CardTitle>
        <CardDescription className="truncate text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-2">
        {tags &&
          tags.map((t) => (
            <Button
              key={t}
              variant={"secondary"}
              className="text-primary h-fit rounded-lg px-2 py-1 text-xs"
            >
              {t}
            </Button>
          ))}
      </CardContent>
      <CardFooter className="justify-end p-0">
        <Button className="absolute bottom-0 right-2 py-0" variant={"ghost"}>
          <DotsHorizontalIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};
