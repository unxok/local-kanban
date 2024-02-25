import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Dark</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="grid grid-cols-3 grid-rows-4">
              <DropdownMenuItem onClick={() => setTheme("dark-zinc")}>
                Zinc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-slate")}>
                Slate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-stone")}>
                Stone
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-gray")}>
                Gray
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-neutral")}>
                Neutral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-red")}>
                Red
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-rose")}>
                Rose
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-orange")}>
                Orange
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-green")}>
                Green
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-blue")}>
                Blue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark-yellow")}>
                Yellow
              </DropdownMenuItem>
              <DropdownMenuItem
                className="dark-violet"
                onClick={() => setTheme("dark-violet")}
              >
                Violet
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Light</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="grid grid-cols-3 grid-rows-4">
              <DropdownMenuItem onClick={() => setTheme("light-zinc")}>
                Zinc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-slate")}>
                Slate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-stone")}>
                Stone
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-gray")}>
                Gray
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-neutral")}>
                Neutral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-red")}>
                Red
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-rose")}>
                Rose
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-orange")}>
                Orange
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-green")}>
                Green
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-blue")}>
                Blue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-yellow")}>
                Yellow
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light-violet")}>
                Violet
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
