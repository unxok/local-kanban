import { CardConfig, LaneConfig } from "@/localSave";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVariant } from "../VariantProvider";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { UpdateCardsType } from "@/App";

export const Lane = (
  props: LaneConfig & {
    boardId: string;
    cards: CardConfig[] | undefined;
    updateCards: UpdateCardsType;
  },
) => {
  const { title, description } = props;
  const { variant } = useVariant();
  return (
    <Card className="w-0 grow border-none bg-transparent shadow-none">
      <CardHeader className="flex items-center justify-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <LaneBody />
      </CardContent>
      <CardFooter>
        <span className="flex w-full items-center justify-center gap-2">
          <Button
            variant={variant}
            className="w-full border bg-transparent text-foreground shadow-none"
          >
            <PlusIcon></PlusIcon>
          </Button>
          <Button
            variant={variant}
            className="w-1/6 border bg-transparent text-foreground shadow-none"
          >
            <DotsHorizontalIcon />
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
};

const LaneBody = () => {
  const { variant } = useVariant();
  return (
    <Card variant={variant}>
      <CardContent>{}</CardContent>
    </Card>
  );
};
