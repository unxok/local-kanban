import { DotFilledIcon } from "@radix-ui/react-icons";

export const LaneHeader = ({
  title,
  bg,
  len,
}: {
  title: string;
  bg: string;
  len: number;
}) => (
  <div className="flex flex-row items-center justify-center gap-2 pb-2">
    <h2 className="font-roboto text-foreground-primary flex flex-row items-center text-sm font-semibold">
      {title}
    </h2>
    <div className="flex flex-row items-center justify-center">
      <span className="text-sm font-bold opacity-50">{len}</span>
      <DotFilledIcon color={bg} />
    </div>
  </div>
);
