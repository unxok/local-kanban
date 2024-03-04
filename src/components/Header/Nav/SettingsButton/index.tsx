import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { GearIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

export const SettingsButton = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const copyLSToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(localStorage));
    toast.success("Save data copied to clipboard");
  };

  const importLSFromClipboard = () => {
    const text = window.prompt("Please paste your save data below");
    if (!text) {
      toast.error("Import save data failed! \nNo data was provided");
      return;
    }
    try {
      const json = JSON.parse(text);
      Object.keys(json).forEach((k) => localStorage.setItem(k, json[k]));
      window.location.reload();
      return;
    } catch (e) {
      toast.error(
        "Import save data failed! \nCheck console for more information",
      );
      console.error(
        "Error occured when attempting to parse JSON from text provided. ",
        e,
      );
      return;
    }
  };

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
                  onClick={() => copyLSToClipboard()}
                >
                  Export
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                  onClick={() => importLSFromClipboard()}
                >
                  Import
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                >
                  Autosave
                </Button>
                <Button
                  variant={"destructiveGhost"}
                  className="flex w-full flex-row justify-start text-destructive"
                  onClick={() => {
                    const isContinue = window.confirm(
                      "This will permanently delete your data. Are you sure?",
                    );
                    if (!isContinue) return;
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Clear data
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
