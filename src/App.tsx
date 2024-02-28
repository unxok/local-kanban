import { CaretSortIcon, GearIcon, RowSpacingIcon } from "@radix-ui/react-icons";
import "./App.css";
import { Board, BoardProps } from "./components/Board";
import { CardsProvider, useCards } from "./components/CardsProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Button, buttonVariants } from "./components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Popover } from "./components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./components/ui/command";
// import { UpdateNewCardDataFn } from "./components/Board/Lane/LaneFooter";
import { Badge } from "./components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { ScrollArea } from "./components/ui/scroll-area";

// const fakeData: CardProps[] = [
//   {
//     title: "Take out trash",
//     description: "Make sure to get recycling too",
//     id: "take-out-trash",
//     tags: ["task"],
//     text: "Note: trash day on Thursday. But it's pretty big anyway",
//     properties: {
//       type: "task",
//       due: "2023/02/26",
//       status: "to-do",
//     },
//   },
//   {
//     title: "Make the bed",
//     description: "Fix the sheets, lay out blankets, etc.",
//     id: "make-the-bed",
//     tags: ["task"],
//     text: "You may want to grab the fur roller thing too just in case there's a bunch of cat hair everywhere",
//     properties: {
//       type: "task",
//       due: "2023/02/26",
//       status: "to-do",
//     },
//   },
//   {
//     title: "Clean litter box",
//     description: "Put in outisde bin!",
//     id: "clean-litter-box",
//     tags: ["task", "gross", "trash", "chore", "house"],
//     text: "I hate doing this but it must be done! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea aliquam reiciendis earum reprehenderit architecto porro, consequatur nulla consectetur deleniti aperiam fuga voluptatum quos fugiat corrupti autem alias iure voluptatibus odio? Quidem, amet porro quasi voluptatem beatae modi animi ullam ab odit inventore. Error magnam, quas laudantium labore ducimus eveniet, cupiditate repellendus quaerat ratione eaque animi autem deserunt eligendi veritatis repellat. Reprehenderit maiores, modi obcaecati assumenda reiciendis iusto dolores, odio eum veniam necessitatibus minus facere alias excepturi. Quam quidem molestiae repudiandae unde similique nobis odit aperiam magnam, delectus illo accusamus alias.",
//     properties: {
//       type: "task",
//       due: "2023/02/24",
//       status: "in-progress",
//     },
//   },
// ];

// const fakeLaneConfig: LaneConfig[] = [
//   {
//     title: "TO DO",
//     id: "to-do",
//     bg: "red",
//   },
//   {
//     title: "IN PROGRESS",
//     id: "in-progress",
//     bg: "blue",
//   },
//   {
//     title: "COMPLETED",
//     id: "completed",
//     bg: "green",
//   },
// ];

// const fakeBoardConfig: BoardProps = {
//   id: "unxoks-board",
//   title: "Unxoks Saved Tasks",
//   description: "a short description",
//   text: "bleep bloop bloop",
//   sortProperty: "status",
//   laneConfigArr: [
//     {
//       title: "TO DO",
//       id: "to-do",
//       bg: "red",
//     },
//     {
//       title: "IN PROGRESS",
//       id: "in-progress",
//       bg: "blue",
//     },
//     {
//       title: "COMPLETED",
//       id: "completed",
//       bg: "green",
//     },
//   ],
// };

function App() {
  const [boardConfigs, setBoardConfigs] = useState<BoardProps[] | undefined>();
  useEffect(() => {
    const boards = localStorage.getItem("boards");
    if (!boards) return;
    setBoardConfigs(JSON.parse(boards));
    console.log(JSON.parse(boards));
  }, []);

  const updateBoardConfig = (
    id: string,
    newConfig: BoardProps,
    isDelete?: boolean,
  ) => {
    if (!boardConfigs) {
      setBoardConfigs([newConfig]);
      localStorage.setItem("boards", JSON.stringify([newConfig]));
      return;
    }
    const foundBoard = boardConfigs?.find((b) => b.id === id);
    if (!foundBoard) {
      setBoardConfigs((prev) => {
        if (!prev) return [newConfig];
        const newBoards = [...prev, newConfig];
        localStorage.setItem("boards", JSON.stringify(newBoards));
        return newBoards;
      });
      return;
    }
    const filteredBoards = boardConfigs?.filter((b) => b.id !== id);
    if (!filteredBoards) {
      throw new Error("You shouldn't be seeing this. Check App.tsx line 110");
    }
    if (isDelete) {
      setBoardConfigs(filteredBoards);
      localStorage.setItem("boards", JSON.stringify(filteredBoards));
      return;
    }
    setBoardConfigs([...filteredBoards, newConfig]);
    localStorage.setItem(
      "boards",
      JSON.stringify([...filteredBoards, newConfig]),
    );
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CardsProvider>
        <div className="fixed inset-0 bg-[url('/abstract-1.svg')] bg-cover">
          <ResizablePanelGroup
            autoSaveId={"header-layout"}
            direction="vertical"
            className="bg-background/40"
          >
            <SiteHeader updateBoardConfig={updateBoardConfig} />

            <ResizableHandle />
            <ResizablePanel>
              <ResizablePanelGroup
                autoSaveId={"sidebar-layout"}
                direction="horizontal"
              >
                <SiteSidebar
                  updateBoardConfig={updateBoardConfig}
                  boardConfigs={boardConfigs}
                />
                <ResizableHandle />
                <SiteMain
                  boardConfigs={boardConfigs}
                  updateBoardConfig={updateBoardConfig}
                />
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </CardsProvider>
    </ThemeProvider>
  );
  // return (
  //   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  //     <CardsProvider>
  //       <div className="bg-background-secondary fixed inset-0 flex flex-col">
  //         {/* <AbstractColor /> */}

  //         <div className="flex flex-row items-center justify-between p-3">
  //           <div className="z-50">
  //             <CardTitle className="ubuntu-medium text-3xl text-primary">
  //               Local Kanban
  //             </CardTitle>
  //             <CardDescription>
  //               Smooth and easy task management that works completely offline
  //             </CardDescription>
  //           </div>
  //           <div className="z-1">
  //             {/* <img
  //                 className="fixed inset-0"
  //                 src="./src/assets/magenta-ripple.jpg"
  //                 alt=""
  //               /> */}
  //           </div>
  //         </div>
  //         <Separator />
  //         <ScrollArea>
  //           <div className="flex flex-col gap-2 p-3">
  //             <div>
  //               <Select>
  //                 <SelectTrigger className="w-[180px]">
  //                   <SelectValue
  //                     defaultValue={"default"}
  //                     placeholder={"All Boards"}
  //                   />
  //                 </SelectTrigger>
  //                 <SelectContent className="relative">
  //                   <SelectItem value="default">All Boards</SelectItem>
  //                   {/*                     <SelectItem value="dark">Dark</SelectItem> */}
  //                   <SelectItem className="text-primary" value="system">
  //                     <span className="flex w-full flex-row items-center gap-1">
  //                       Manage views
  //                       <ArrowTopRightIcon />
  //                     </span>
  //                   </SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div className="">
  //               {boardConfigs &&
  //                 boardConfigs?.map((board) => (
  //                   <Board
  //                     key={board.id}
  //                     title={board.title}
  //                     id={board.id}
  //                     description={board.description}
  //                     sortProperty={board.sortProperty}
  //                     laneConfigArr={board.laneConfigArr}
  //                     updateBoardConfig={updateBoardConfig}
  //                   ></Board>
  //                 ))}
  //             </div>
  //           </div>
  //         </ScrollArea>
  //       </div>
  //     </CardsProvider>
  //   </ThemeProvider>
  // );
}

export default App;

export const SiteHeader = ({
  updateBoardConfig,
}: {
  updateBoardConfig: any;
}) => {
  console.log(updateBoardConfig);
  return (
    <ResizablePanel
      className="relative bg-background/70 backdrop-blur-md"
      collapsible={true}
      collapsedSize={0}
      minSize={9}
      defaultSize={9}
      onInput={(e) => console.log("what is this: ", e)}
    >
      <div className="absolute inset-0 flex flex-row items-start justify-between p-5">
        <div>
          <CardTitle className="ubuntu-medium peer text-3xl text-primary hover:underline hover:underline-offset-2">
            <a href="#">Local Kanban</a>
          </CardTitle>
          <CardDescription>
            Smooth and easy task management that works completely offline
          </CardDescription>
        </div>
        <div className="flex flex-row items-center gap-3 pt-1">
          <Button variant={"default"}>Dashboard</Button>
          <Button variant={"ghost"}>About me</Button>
          <a
            href="https://github.com/unxok/local-kanban"
            target="_blanks"
            className={buttonVariants({ variant: "ghost" })}
          >
            Source Code
          </a>
        </div>
        <Sheet>
          <SheetTrigger
            className={`group stroke-primary p-3 ${buttonVariants({ variant: "ghost" })}`}
          >
            <GearIcon
              className="group-hover:animate-spin"
              width={20}
              height={20}
            />
          </SheetTrigger>
          <SheetContent side={"right"}>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription className="flex flex-col gap-3">
                {/*                 <AddBoardButton updateBoardConfig={updateBoardConfig} /> */}
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(localStorage));
                    window.alert("Data copied to clipboard");
                  }}
                >
                  Copy all data
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={async () => {
                    const data: any = await window.prompt(
                      "Warning: All current data will be deleted by doing this",
                    );
                    const parsed: any = JSON.parse(data);
                    localStorage.clear();
                    Object.keys(parsed).forEach((k) => {
                      // @ts-ignore TODO
                      localStorage.setItem(k, parsed[k]);
                    });
                    window.location.reload();
                  }}
                >
                  Import all data (clears current)
                </Button>
                <ClearDataButton />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </ResizablePanel>
  );
};

export const SiteSidebar = ({
  updateBoardConfig,
  boardConfigs,
}: {
  updateBoardConfig: any;
  boardConfigs: any;
}) => {
  return (
    <ResizablePanel
      collapsible={true}
      collapsedSize={0}
      minSize={9}
      defaultSize={9}
      className="relative bg-background/70 backdrop-blur-md"
    >
      <div className="absolute inset-0 flex flex-col items-start gap-5 p-5">
        <CardTitle>Boards</CardTitle>
        <CardDescription>View and manage your boards</CardDescription>
        <AddBoardButton asChild={true} updateBoardConfig={updateBoardConfig}>
          <Button className="w-full">Add board</Button>
        </AddBoardButton>

        {boardConfigs ? (
          <>
            <Button variant={"outline"} className="w-full text-primary">
              All boards
            </Button>
            {boardConfigs.map((b: any) => (
              <Button key={b.id} variant={"outline"} className="w-full">
                {b.title}
              </Button>
            ))}
          </>
        ) : (
          <span className="text-muted-foreground">
            No boards yet... what are you waiting for?
          </span>
        )}
      </div>
    </ResizablePanel>
  );
};

type UpdateNewBoardConfig = (
  e:
    | React.FormEvent<HTMLInputElement>
    | {
        id: string;
        value: any;
      },
) => void;

export const AddBoardButton = ({
  updateBoardConfig,
  defaultVal,
  children,
  asChild,
}: {
  updateBoardConfig: (id: string, newConfig: BoardProps) => BoardProps[] | void;
  defaultVal?: BoardProps;
  children: any;
  asChild: boolean;
}) => {
  //
  const [newBoardConfig, setNewBoardConfig] = useState(
    defaultVal || {
      title: "Untitled Board",
      description: "some description",
      id: "untitled-board",
      laneConfigArr: [
        {
          id: "to-do",
          title: "TO DO",
          bg: "red",
        },
      ],
    },
  );
  const { cardTags } = useCards();

  useEffect(() => console.log("board", newBoardConfig), [newBoardConfig]);

  const updateNewBoardConfig: UpdateNewBoardConfig = (e) =>
    setNewBoardConfig((prev) => {
      if ((e as React.FormEvent<HTMLInputElement>).currentTarget) {
        return {
          ...prev,
          // @ts-ignore Screw you TS
          [e.currentTarget.id]: e.currentTarget.value,
        };
      }
      return {
        ...prev,
        // @ts-ignore Scree you TS
        [e.id]: e.value,
      };
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <ScrollArea className="max-h-[80vh] p-5 pb-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Create board</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new board with the following settings.
              <div className="flex w-full flex-col gap-3 py-2">
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    defaultValue={defaultVal?.title}
                    placeholder="Tasks"
                    onInput={(e) => {
                      updateNewBoardConfig(e);
                      // updateNewBoardConfig({
                      //   id: "id",
                      //   value: e.currentTarget.value,
                      // });
                    }}
                    className="w-3/4"
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    defaultValue={defaultVal?.description}
                    placeholder="Some short description..."
                    onInput={updateNewBoardConfig}
                    className="w-3/4"
                  />
                </div>
                <PropertySelect updateNewBoardConfig={updateNewBoardConfig} />
                <TagsInput
                  updateNewBoardConfig={updateNewBoardConfig}
                  cardTags={cardTags}
                />
                <PropertiesInput updateNewBoardConfig={updateNewBoardConfig} />
                <NotesInput updateNewBoardConfig={updateNewBoardConfig} />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                updateBoardConfig(
                  newBoardConfig.id,
                  newBoardConfig as BoardProps,
                )
              }
            >
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TagsInput = ({
  cardTags,
  updateNewBoardConfig,
  defaultVal,
}: {
  cardTags: string[] | null;
  // updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: string[] | null;
  updateNewBoardConfig: UpdateNewBoardConfig;
}) => {
  // something
  const [newTags, setNewTags] = useState<string[] | null>(defaultVal || null);
  const [unusedTags, setUnusedTags] = useState(cardTags);

  const updateTags = (callback: (tags: string[] | null) => string[] | null) => {
    const tagsArr = callback(newTags);
    setNewTags(tagsArr);
    updateNewBoardConfig({ id: "tags", value: tagsArr });
  };

  const addTag = (tag: string) => {
    if (!newTags) {
      updateTags((_) => [tag]);
      setUnusedTags((prev) => (prev ? prev.filter((t) => t !== tag) : null));
      return;
    }
    if (!newTags.includes(tag)) {
      updateTags((prev) => [...(prev as string[]), tag]);
    }
    setUnusedTags((prev) => (prev ? prev.filter((t) => t !== tag) : null));
  };

  const removeTag = (tag: string) => {
    if (!newTags) return;
    const updatedTagArr = newTags.filter((t) => t !== tag);
    updateTags(() => updatedTagArr);
    if (unusedTags) {
      const newUnusedTags = [...unusedTags];
      newUnusedTags.push(tag);
      setUnusedTags(newUnusedTags);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="ubuntu-regular text-xl tracking-wide">
          Tags
        </CardTitle>
        <CardDescription>
          Cards will only display in this board if their tags include the ones
          you specify below. You can leave this blank if preferred.
        </CardDescription>
        <AllTagsSearch addTag={addTag} unusedTags={unusedTags} />
      </CardHeader>
      <CardContent>
        <SelectedTags
          cardTags={cardTags}
          removeTag={removeTag}
          newTags={newTags}
        />
      </CardContent>
      <CardContent>
        <AllTagsSelector
          cardTags={cardTags}
          unusedTags={unusedTags}
          addTag={addTag}
        />
      </CardContent>
    </Card>
  );
};

const AllTagsSearch = ({
  unusedTags,
  addTag,
}: {
  unusedTags: string[] | null;
  addTag: (tag: string) => void;
}) => {
  const [searchTag, setSearchTag] = useState("");
  // console.log("unused", unusedTags);
  return (
    <span className="flex flex-row items-center gap-1 pt-2">
      <Popover>
        <PopoverTrigger className={buttonVariants({ variant: "outline" })}>
          Search for tags <CaretSortIcon />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          onCloseAutoFocus={() => setSearchTag("")}
          className="h-56"
        >
          <Command>
            <CommandInput
              value={searchTag}
              onInput={(e) => setSearchTag(e.currentTarget.value)}
              placeholder="some-tag..."
            />
            <CommandEmpty>Tag already used or doesn't exist.</CommandEmpty>
            {/* <ScrollArea> */}
            <CommandGroup>
              {unusedTags &&
                !!unusedTags[0] &&
                unusedTags.map((t) => (
                  <CommandItem
                    value={t}
                    key={t + "-tag-command-item"}
                    onSelect={(val) => addTag(val)}
                  >
                    {t}
                  </CommandItem>
                ))}
              {searchTag && (
                <CommandItem onSelect={() => addTag(searchTag)}>
                  Add new tag:&nbsp;
                  <span className="text-primary">{searchTag}</span>
                </CommandItem>
              )}
            </CommandGroup>
            {/* </ScrollArea> */}
          </Command>
        </PopoverContent>
      </Popover>
    </span>
  );
};

const SelectedTags = ({
  cardTags,
  newTags,
  removeTag,
}: {
  cardTags: string[] | null;
  newTags: string[] | null;
  removeTag: (tag: string) => void;
}) => {
  // ss
  return (
    <>
      <CardTitle className="ubuntu-regular tracking-wide">
        Selected tags
      </CardTitle>
      <CardDescription>click to remove</CardDescription>
      {cardTags ? (
        <div className="flex flex-row flex-wrap gap-1">
          {newTags &&
            newTags.map((t) => (
              <Badge
                key={t}
                onClick={(e) => {
                  if (!e) return;
                  if (!e.currentTarget) return;
                  removeTag(e.currentTarget.textContent || "");
                }}
              >
                {t}
              </Badge>
            ))}
        </div>
      ) : (
        <div>none used</div>
      )}
    </>
  );
};

const AllTagsSelector = ({
  cardTags,
  unusedTags,
  addTag,
}: {
  cardTags: string[] | null;
  unusedTags: string[] | null;
  addTag: (tag: string) => void;
}) => {
  // ...
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <CardTitle className="ubuntu-regular flex flex-row items-center gap-1 text-xl tracking-wide">
          All tags{" "}
          <RowSpacingIcon
            color={`hsl(${window
              .getComputedStyle(document.documentElement)
              .getPropertyValue("--primary")})`}
          />
        </CardTitle>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1">
        <CardDescription>click to add</CardDescription>
        {cardTags ? (
          <div className="flex flex-row flex-wrap gap-1">
            {unusedTags &&
              unusedTags.map((t) => (
                <Badge
                  key={t}
                  onClick={(e) =>
                    e &&
                    e.currentTarget &&
                    e.currentTarget.textContent &&
                    addTag(e.currentTarget.textContent)
                  }
                >
                  {t}
                </Badge>
              ))}
          </div>
        ) : (
          <div>none used</div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

const PropertySelect = ({
  defaultVal,
  updateNewBoardConfig,
}: {
  defaultVal?: string;
  updateNewBoardConfig: UpdateNewBoardConfig;
}) => {
  const [searchField, setSearchField] = useState(defaultVal || "");
  const { cardFields } = useCards();
  const updateSearchField = (field: string) => {
    setSearchField(field);
    updateNewBoardConfig({ id: "sortProperty", value: field });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="ubuntu-regular text-xl tracking-wide">
          Sort Property
        </CardTitle>
        <CardDescription>
          This is the property that the lanes within the board will adjust as
          cards are moved between them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger className={buttonVariants({ variant: "outline" })}>
            search field names&nbsp;
            <CaretSortIcon />
          </PopoverTrigger>
          <PopoverContent side="top">
            <Command>
              <CommandInput
                placeholder="search known fields"
                value={searchField}
                onInput={(e) => updateSearchField(e.currentTarget.value)}
              />
              <CommandEmpty>
                {/* add new field:&nbsp;
                <span className="text-primary">{searchField}</span> */}
              </CommandEmpty>
              <CommandGroup>
                {cardFields &&
                  cardFields.map((field) => (
                    <CommandItem
                      key={field}
                      value={field}
                      onSelect={(val) => updateSearchField(val)}
                    >
                      {field}
                    </CommandItem>
                  ))}
                {searchField && (
                  <CommandItem>
                    add new field:&nbsp;{" "}
                    <span className="text-primary">{searchField}</span>
                  </CommandItem>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {searchField && (
          <div>
            Selected: <span className="text-primary">{searchField}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PropertiesInput = ({
  // updateNewCardData,
  defaultVal,
  updateNewBoardConfig,
}: {
  // updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: { [key: string]: any } | null;
  updateNewBoardConfig: UpdateNewBoardConfig;
}) => {
  const [searchField, setSearchField] = useState("");
  const { cardFields, getValuesForField } = useCards();
  // const [unusedFields, setUnusedFields] = useState(cardFields);
  const [newProperties, setNewProperties] = useState<any>(defaultVal || {});

  const updateProperties = (field: string, value: string | undefined) => {
    setNewProperties((prev: any) => {
      // if (prev.hasOwnProperty(field)) return prev;
      const props = {
        ...prev,
        [field]: value,
      };
      // updateNewCardData((prev) => ({ ...prev, properties: props }));
      updateNewBoardConfig({ id: "properties", value: props });
      return props;
    });
  };

  // TODO should really break this into at least one more component
  return (
    <Card>
      <CardHeader>
        <CardTitle className="ubuntu-regular text-xl tracking-wide">
          Properties
        </CardTitle>
        <CardDescription>
          Cards will only display in this board if their properties include the
          ones you set here <b>and</b> their values match what you set. You can
          leave this blank if preferred.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger className={buttonVariants({ variant: "outline" })}>
            search field names&nbsp;
            <CaretSortIcon />
          </PopoverTrigger>
          <PopoverContent side="top">
            <Command>
              <CommandInput
                placeholder="search known fields"
                value={searchField}
                onInput={(e) => setSearchField(e.currentTarget.value)}
              />
              <CommandEmpty
                onSelect={() => updateProperties(searchField, undefined)}
              >
                add new field:&nbsp;
                <span className="text-primary">{searchField}</span>
              </CommandEmpty>
              <CommandGroup>
                {cardFields &&
                  cardFields.map((field) => (
                    <CommandItem
                      key={field}
                      value={field}
                      onSelect={(val) => updateProperties(val, undefined)}
                    >
                      {field}
                    </CommandItem>
                  ))}
                {searchField && (
                  <CommandItem
                    onSelect={() => updateProperties(searchField, undefined)}
                  >
                    add new field:&nbsp;{" "}
                    <span className="text-primary">{searchField}</span>
                  </CommandItem>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Field Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(newProperties).map((property) => (
              <TableRow key={property + "-property-row"}>
                <TableCell>{property}</TableCell>
                <TableCell>
                  <PropertyValueComboBox
                    valueOptions={getValuesForField(property)}
                    propertyName={property}
                    updateProperties={updateProperties}
                    defaultVal={newProperties[property]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const PropertyValueComboBox = ({
  valueOptions,
  defaultVal,
  propertyName,
  updateProperties,
}: {
  valueOptions: string[] | null;
  defaultVal?: string;
  propertyName: string;
  updateProperties: (field: string, value: string | undefined) => void;
}) => {
  const [chosenValue, setChosenValue] = useState(defaultVal || "click to set");
  const [searchValue, setSearchValue] = useState("");

  const updateValue = (val: string) => {
    console.log(val);
    setChosenValue(val);
    updateProperties(propertyName, val);
  };

  // useEffect(() => console.log(searchValue), [searchValue]);

  return (
    <Popover>
      <PopoverTrigger>{chosenValue}</PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            onInput={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="start typing..."
          />
          <CommandGroup>
            {valueOptions &&
              valueOptions.map((val, i) => (
                <CommandItem
                  key={val + i}
                  value={val}
                  onSelect={(v) => updateValue(v)}
                >
                  {val}
                </CommandItem>
              ))}
            {/* figure out why this isn't working with searchValue instead of true */}
            {searchValue && (
              <CommandItem
                value={searchValue}
                onSelect={() => updateValue(searchValue)}
              >
                Add new value:&nbsp;
                <span className="text-primary">{searchValue}</span>
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const NotesInput = ({
  // updateNewCardData,
  defaultVal,
  updateNewBoardConfig,
}: {
  // updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: string | null;
  updateNewBoardConfig: UpdateNewBoardConfig;
}) => {
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle className="ubuntu-regular text-xl tracking-wide">
          Notes
        </CardTitle>
        <CardDescription>
          <i>**Markdown**</i> supported :heart:
        </CardDescription>
      </CardHeader>
      <CardContent className="relative overflow-y-visible">
        {/* <span className="flex flex-row items-start justify-between pb-1 pt-3"> */}
        <Label htmlFor="text" className="sr-only">
          Description
        </Label>
        <Textarea
          id="text"
          name="text"
          defaultValue={defaultVal || undefined}
          placeholder="Optional notes about doing a thing"
          className="h-[40vh]"
          onInput={(e) => {
            const { value } = e.currentTarget;
            updateNewBoardConfig({ id: "text", value: value });
          }}
        />
        {/* </span> */}
      </CardContent>
    </Card>
  );
};

const SiteMain = ({
  boardConfigs,
  updateBoardConfig,
}: {
  boardConfigs: any;
  updateBoardConfig: any;
}) => {
  //
  return (
    <ResizablePanel className="relative bg-background/50">
      <div className="absolute inset-0 flex flex-col gap-2 overflow-y-scroll p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/80">
        {boardConfigs ? (
          boardConfigs?.map((board: any) => (
            <Board
              key={board.id}
              title={board.title}
              id={board.id}
              description={board.description}
              sortProperty={board.sortProperty}
              laneConfigArr={board.laneConfigArr}
              updateBoardConfig={updateBoardConfig}
            ></Board>
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Card className="w-3/4 bg-background/60 text-3xl backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-primary">Welcome!</CardTitle>
                <CardDescription>
                  Use the left side bar to add your first board
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="flex h-fit w-3/4 flex-row items-start justify-center gap-1">
              <Card className="basis-full bg-background/60 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Secure</CardTitle>
                  <CardDescription>
                    Your data is saved to your browser only.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This is a static site that stores any and all data in your
                    browser's Local Storage.
                  </p>
                  <p>
                    This means you are responsible for sharing your data with
                    your other devices and others.
                  </p>
                  <p>
                    Best practice is to make backup save files at least every
                    day
                  </p>
                </CardContent>
              </Card>
              <Card className="basis-full bg-background/60 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Customizable
                  </CardTitle>
                  <CardDescription>Colors, layout, and more!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Click the gear in the top right to access your settings
                    where you can change the color scheme and background image.
                  </p>
                  <p>
                    You can also drag the borders of the header and sidebar to
                    resize them (p.s. that gets saved too)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </ResizablePanel>
  );
};

export const ClearDataButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructiveGhost" })}
      >
        Clear all data
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Saved Data</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
