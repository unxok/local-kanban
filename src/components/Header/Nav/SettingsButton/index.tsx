import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DownloadIcon, GearIcon } from "@radix-ui/react-icons";
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
import { Variant, useVariant } from "@/components/VariantProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveThemeCss } from "@/localSave";

export const SettingsButton = (props: {
  setThemeCss: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
        className="group"
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
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <ThemeSelector />
                <VariantSelector />
                <ThemeCustomizerButton {...props} />
                <BgImageSelector />
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
              </div>
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

const VariantSelector = () => {
  const { variant, setVariant } = useVariant();
  const handleVariantChange = (val: string) => {
    setVariant(val as Variant);
  };
  return (
    <Select onValueChange={(v) => handleVariantChange(v)}>
      <SelectTrigger>
        <SelectValue placeholder={`Style: ${variant}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="retro">Retro</SelectItem>
        <SelectItem value="modernRetro">Modern Retro</SelectItem>
        <SelectItem value="glassy">Glassy</SelectItem>
        <SelectItem value="neon">Neon</SelectItem>
      </SelectContent>
    </Select>
  );
};

const BgImageSelector = () => {
  const [searchTerms, setSearchTerms] = useState<string>(
    localStorage.getItem("searchTerms") || "",
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-b px-3 text-foreground"
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="w-full py-2">
          Background Image
        </AccordionTrigger>
        <AccordionContent asChild>
          <RadioGroup
            defaultValue="random"
            onValueChange={(v) => console.log(v)}
          >
            <span className="flex w-full flex-col items-start justify-start gap-3">
              <span className="flex flex-row gap-2">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random">Random Image</Label>
              </span>
              <span className="flex w-full flex-row gap-2 px-6">
                <Label htmlFor="randomSearchTerms" className="sr-only">
                  Search terms
                </Label>
                <Input
                  id="randomSearchTerms"
                  type="text"
                  placeholder="search terms here"
                  value={searchTerms}
                  onInput={(e) => setSearchTerms(e.currentTarget.value)}
                  className="w-full"
                />
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    localStorage.setItem("searchTerms", searchTerms);
                    console.log("just set st: ", searchTerms);
                    window.location.reload();
                  }}
                >
                  <DownloadIcon />
                </Button>
              </span>
            </span>
            <span className="flex w-full flex-col items-start justify-start gap-3">
              <span className="flex flex-row gap-2">
                {/* TODO get this working */}
                <RadioGroupItem disabled value="static" id="static" />
                <Label htmlFor="static">Static Image</Label>
              </span>
              <span className="flex flex-col gap-2 px-6">
                <Label htmlFor="uploadImage" className="sr-only">
                  Upload image
                </Label>
                <Input
                  disabled
                  id="uploadImage"
                  type="file"
                  placeholder="search terms here"
                  className="hover:cursor-pointer hover:border-foreground hover:text-foreground"
                />
              </span>
            </span>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ThemeCustomizerButton = ({
  setThemeCss,
}: {
  setThemeCss: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [css, setCss] = useState<string>();
  const { variant } = useVariant();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex w-full flex-row justify-start text-foreground"
        >
          Customize Theme
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Theme CSS</DialogTitle>
          <DialogDescription asChild>
            <div>
              You will need to get the CSS for your theme from somewhere like:
              <ul className="flex flex-col gap-1 px-4 py-2">
                <li className="list-disc">
                  <a
                    className="text-foreground underline"
                    href="https://ui.shadcn.com/themes"
                  >
                    Shadcn official theme page
                  </a>
                  <ul className="flex flex-col gap-1 px-4 py-2">
                    <li className="list-disc">
                      Created the base components this site is built on!
                    </li>
                  </ul>
                </li>
                <li className="list-disc">
                  <a
                    className="text-foreground underline"
                    href="https://zippystarter.com/tools/shadcn-ui-theme-generator"
                  >
                    Shadcn UI theme generator
                  </a>{" "}
                  (zippystarter.com)
                  <ul className="flex flex-col gap-1 px-4 py-2">
                    <li className="list-disc">
                      Recommended! Just copy & paste
                    </li>
                  </ul>
                </li>
                <li className="list-disc">
                  <a
                    className="text-foreground underline"
                    href="https://gradient.page/tools/shadcn-ui-theme-generator"
                  >
                    Shadcn UI Theme Generator
                  </a>{" "}
                  (gradient.page)
                  <ul className="flex flex-col gap-1 px-4 py-2">
                    <li className="list-disc">Only solid colors work here</li>
                  </ul>
                </li>
              </ul>
              Then paste it below
            </div>
          </DialogDescription>
        </DialogHeader>
        <span>
          Do <span className="underline">not</span> include the{" "}
          <code className="rounded-sm bg-secondary px-1">@layer base</code>{" "}
          directive
        </span>
        <span>Should look like this:</span>
        <pre className="rounded-md bg-secondary p-2">
          <code>
            :root &#123;
            <br />
            ...
            <br />
            &#125;
            <br />
            .dark &#123;
            <br />
            ...
            <br />
            &#125;
          </code>
        </pre>
        <Textarea
          value={css}
          onInput={(e) => setCss(e.currentTarget.value)}
          placeholder="past CSS here..."
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={variant}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/70"
              onClick={() => saveThemeCss("")}
            >
              Reset
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={variant} onClick={() => css && setThemeCss(css)}>
              Apply
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
