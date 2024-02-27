import { CardProps, useCards } from "@/components/CardsProvider";
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
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusIcon,
  DotsVerticalIcon,
  RowSpacingIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export const LaneFooter = ({
  laneTitle,
  laneId,
  sortProperty,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
}) => (
  <div className="flex flex-row gap-1 px-1 pt-2">
    <NewCardButton
      laneId={laneId}
      laneTitle={laneTitle}
      sortProperty={sortProperty}
    >
      <div className={`w-full ${buttonVariants({ variant: "outline" })}`}>
        <PlusIcon />
      </div>
    </NewCardButton>
    <Button className="w-1/4" variant={"outline"}>
      <DotsVerticalIcon />
    </Button>
  </div>
);

export const NewCardButton = ({
  laneTitle,
  laneId,
  sortProperty,
  children,
  defaultCardData,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
  children: any;
  defaultCardData?: CardProps;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={(b) => setIsOpen(b)}>
      <AlertDialogTrigger className="w-3/4">{children}</AlertDialogTrigger>
      <NewCardModal
        laneId={laneId}
        laneTitle={laneTitle}
        sortProperty={sortProperty}
        defaultCardData={defaultCardData}
        setIsOpen={setIsOpen}
      />
    </AlertDialog>
  );
};

export type UpdateNewCardDataFn = (
  callback: (cardData: CardProps) => any,
) => void | CardProps | undefined | null;

const NewCardModal = ({
  laneTitle,
  laneId,
  sortProperty,
  defaultCardData,
  setIsOpen,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
  defaultCardData?: CardProps;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cardPropsTemplate = {
    title: "Unnamed card",
    id: "unnamed-card",
    properties: { [sortProperty]: laneId },
  };
  const [newCardData, setNewCardData] = useState<CardProps>(
    defaultCardData || cardPropsTemplate,
  );
  const { cardTags, setCardById } = useCards();

  useEffect(() => console.log("new card: ", newCardData), [newCardData]);

  const updateNewCardData: UpdateNewCardDataFn = (callback) => {
    const data = { ...newCardData };
    if (typeof callback !== "function") {
      setNewCardData(callback);
      return;
    }
    const newData = callback(data);
    if (newData === undefined) return;
    setNewCardData(newData);
  };

  return (
    <AlertDialogContent className="p-0">
      <ScrollArea className="max-h-[80vh] p-5 pb-0">
        {/* <div> */}
        <AlertDialogHeader>
          <AlertDialogTitle>
            {defaultCardData ? (
              <span>
                Editing the&nbsp;
                <span className="text-primary">{defaultCardData.title}</span>
                &nbsp;card
              </span>
            ) : (
              "New Card"
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Creating a new card in the{" "}
            <span className="text-primary">{laneTitle}</span> Lane
          </AlertDialogDescription>
          <div className="flex flex-col gap-3 py-3">
            <TitleInput
              defaultVal={newCardData.title}
              updateNewCardData={updateNewCardData}
            />
            <DescriptionInput
              defaultVal={newCardData.description}
              updateNewCardData={updateNewCardData}
            />
            <TagsInput
              updateNewCardData={updateNewCardData}
              cardTags={cardTags}
              defaultVal={newCardData.tags}
            ></TagsInput>
            <PropertiesInput
              laneId={laneId}
              laneTitle={laneTitle}
              sortProperty={sortProperty}
              updateNewCardData={updateNewCardData}
              defaultVal={newCardData.properties}
            ></PropertiesInput>
            <NotesInput
              updateNewCardData={updateNewCardData}
              defaultVal={newCardData.text}
            />
          </div>
        </AlertDialogHeader>
        {/* </div> */}
      </ScrollArea>
      <Separator />
      <AlertDialogFooter className="flex flex-row p-5 pt-0">
        <div className="flex w-full flex-row justify-start">
          {defaultCardData && (
            <AlertDialogAction
              className={buttonVariants({ variant: "destructiveGhost" })}
              onClick={() => setCardById(newCardData.id, newCardData, true)}
            >
              Delete
            </AlertDialogAction>
          )}
        </div>
        <div className="flex w-full flex-row justify-end gap-3">
          <AlertDialogCancel
            onClick={() => {
              setIsOpen(false);
              setNewCardData(cardPropsTemplate);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setCardById(newCardData.id, newCardData);
              setIsOpen(false);
              setNewCardData(() => cardPropsTemplate);
            }}
          >
            {defaultCardData ? "Update" : "Create"}
          </AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const TitleInput = ({
  updateNewCardData,
  defaultVal,
}: {
  updateNewCardData: UpdateNewCardDataFn;
  defaultVal: string;
}) => {
  //
  return (
    <span className="flex flex-row items-center justify-between">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        placeholder="Do a thing"
        defaultValue={defaultVal}
        className="w-3/4"
        onInput={(e) =>
          updateNewCardData((prev) => {
            if (!e.target) return;
            if (!(e.target as HTMLInputElement).id) return;
            if (!(e.target as HTMLInputElement).value) return;
            const { id, value } = e.target as HTMLInputElement;
            return { ...prev, [id]: value, id: value };
          })
        }
      />
    </span>
  );
};

const DescriptionInput = ({
  updateNewCardData,
  defaultVal,
}: {
  updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: string | null;
}) => {
  //
  return (
    <span className="flex flex-row items-center justify-between">
      <Label htmlFor="title">Description</Label>
      <Input
        id="description"
        name="description"
        type="text"
        placeholder="Optional details about doing a thing"
        defaultValue={defaultVal || undefined}
        className="w-3/4"
        onInput={(e) =>
          updateNewCardData((prev) => {
            if (!e.target) return;
            if (!(e.target as HTMLInputElement).id) return;
            if (!(e.target as HTMLInputElement).value) return;
            const { id, value } = e.target as HTMLInputElement;
            return { ...prev, [id]: value };
          })
        }
      />
    </span>
  );
};

const TagsInput = ({
  cardTags,
  updateNewCardData,
  defaultVal,
}: {
  cardTags: string[] | null;
  updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: string[] | null;
}) => {
  // something
  const [newTags, setNewTags] = useState<string[] | null>(defaultVal || null);
  const [unusedTags, setUnusedTags] = useState(cardTags);

  const updateTags = (callback: (tags: string[] | null) => string[] | null) => {
    const tagsArr = callback(newTags);
    setNewTags(tagsArr);
    updateNewCardData((prev) => {
      return { ...prev, tags: tagsArr };
    });
    // console.log("did it update?");
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
  console.log("unused", unusedTags);
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

const PropertiesInput = ({
  // laneTitle,
  laneId,
  sortProperty,
  updateNewCardData,
  defaultVal,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
  updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: { [key: string]: any } | null;
}) => {
  const [searchField, setSearchField] = useState("");
  const { cardFields, getValuesForField } = useCards();
  // const [unusedFields, setUnusedFields] = useState(cardFields);
  const [newProperties, setNewProperties] = useState<any>(
    defaultVal || {
      [sortProperty]: laneId,
    },
  );

  const updateProperties = (field: string, value: string | undefined) => {
    setNewProperties((prev: any) => {
      // if (prev.hasOwnProperty(field)) return prev;
      const props = {
        ...prev,
        [field]: value,
      };
      updateNewCardData((prev) => ({ ...prev, properties: props }));
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
  updateNewCardData,
  defaultVal,
}: {
  updateNewCardData: UpdateNewCardDataFn;
  defaultVal?: string | null;
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
            return updateNewCardData((prev) => {
              if (!e.target) return;
              if (!(e.target as HTMLInputElement).id) return;
              if (!(e.target as HTMLInputElement).value) return;
              const { id, value } = e.target as HTMLInputElement;
              return { ...prev, [id]: value };
            });
          }}
        />
        {/* </span> */}
      </CardContent>
    </Card>
  );
};
