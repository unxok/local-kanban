import { Button } from "@/components/ui/button";
import { PlusIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

export const LaneFooter = () => (
  <div className="flex flex-row gap-1 px-1 pt-2">
    <Button className="w-3/4" variant={"outline"}>
      <PlusIcon />
    </Button>
    <Button className="w-1/4" variant={"outline"}>
      <DotsVerticalIcon />
    </Button>
  </div>
);
