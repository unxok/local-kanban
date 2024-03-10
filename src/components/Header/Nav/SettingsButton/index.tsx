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
import { downloadToFile } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme, useTheme } from "@/components/ThemeProvider";

const defaultButtonClassName = "flex w-full flex-row justify-start";

export const SettingsButton = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const copyLSToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(localStorage));
    toast.success("Save data copied to clipboard");
  };

  const exportToFile = () => {
    downloadToFile(
      JSON.stringify(localStorage),
      "save.localkanban",
      "application/json",
    );
  };

  const importFromFile = () => {
    const inp = document.createElement("input");
    const reader = new FileReader();
    inp.type = "file";

    inp.addEventListener("change", () => {
      const file = inp?.files?.[0];
      if (!file) {
        toast.error("Import save data failed! \nNo data was provided");
        return;
      }
      reader.readAsText(file);
    });

    reader.addEventListener("load", () => {
      if (!(typeof reader.result === "string")) {
        toast.error("Import save data failed!\nUnexpected file contents");
        return;
      }
      try {
        const json = JSON.parse(reader.result);
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
    });

    inp.click();
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
          className="text-black transition-transform group-hover:animate-spin"
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
                <ThemeSelector />
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                  onClick={() => copyLSToClipboard()}
                >
                  Export to clipboard
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                  onClick={() => exportToFile()}
                >
                  Export to file
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                  onClick={() => importLSFromClipboard()}
                >
                  Import from clipboard
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex w-full flex-row justify-start"
                  onClick={() => importFromFile()}
                >
                  Import from file
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

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (val: string) => {
    setTheme(val as Theme);
  };
  return (
    <Select onValueChange={(v) => handleThemeChange(v)}>
      <SelectTrigger>
        <SelectValue placeholder={`Theme: ${theme}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
