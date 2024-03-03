import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { GearIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const SettingsButton = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Button
        aria-label="Settings"
        variant={"ghost"}
        className="group text-muted-foreground"
        onClick={() => setSheetOpen((prev) => !prev)}
      >
        <GearIcon
          height={20}
          width={20}
          className="transition-transform group-hover:animate-spin"
        />
      </Button>
      {isSheetOpen && (
        <Sheet
          open={isSheetOpen}
          onOpenChange={() => setSheetOpen((prev) => !prev)}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription className="flex w-full flex-col items-start justify-center gap-1">
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                >
                  Theme
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                >
                  Export
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                >
                  Import
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                >
                  Autosave
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
