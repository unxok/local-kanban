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
import { FormEvent, useEffect, useState } from "react";

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
    />
    <Button className="w-1/4" variant={"outline"}>
      <DotsVerticalIcon />
    </Button>
  </div>
);

export const NewCardButton = ({
  laneTitle,
  laneId,
  sortProperty,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-3/4">
        <div className={`w-full ${buttonVariants({ variant: "outline" })}`}>
          <PlusIcon />
        </div>
      </AlertDialogTrigger>
      <NewCardModal
        laneId={laneId}
        laneTitle={laneTitle}
        sortProperty={sortProperty}
      />
    </AlertDialog>
  );
};

const NewCardModal = ({
  laneTitle,
  laneId,
  sortProperty,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
}) => {
  const [newCardData, setNewCardData] = useState<CardProps>({
    title: "Unnamed card",
    id: "unnamed-card",
  });
  console.log(newCardData);
  const { cardTags } = useCards();

  const updateNewCardData = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!e || !e.currentTarget) return;

    const {
      currentTarget: { id, value },
    } = e;
    setNewCardData((card) => ({
      ...card,
      [id]: value,
    }));
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>New Card</AlertDialogTitle>
        <AlertDialogDescription>
          Creating a new card in the{" "}
          <span className="text-primary">{laneTitle}</span> Lane
        </AlertDialogDescription>
        <div className="flex flex-col gap-3 pt-3">
          <TitleInput updateNewCardData={updateNewCardData} />
          <DescriptionInput updateNewCardData={updateNewCardData} />
          <TagsInput
            setNewCardData={setNewCardData}
            cardTags={cardTags}
          ></TagsInput>
          <PropertiesInput
            laneId={laneId}
            laneTitle={laneTitle}
            sortProperty={sortProperty}
          ></PropertiesInput>
          <NotesInput updateNewCardData={updateNewCardData} />
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Create</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const TitleInput = ({
  updateNewCardData,
}: {
  updateNewCardData: (e: FormEvent<HTMLInputElement>) => void;
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
        className="w-3/4"
        onInput={(e) => updateNewCardData(e)}
      />
    </span>
  );
};

const DescriptionInput = ({
  updateNewCardData,
}: {
  updateNewCardData: (e: FormEvent<HTMLInputElement>) => void;
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
        className="w-3/4"
        onInput={(e) => updateNewCardData(e)}
      />
    </span>
  );
};

const PropertiesInput = ({
  // laneTitle,
  laneId,
  sortProperty,
}: {
  laneTitle: string;
  laneId: string;
  sortProperty: string;
}) => {
  const [searchField, setSearchField] = useState("");
  const { cardFields, getValuesForField } = useCards();
  // const [unusedFields, setUnusedFields] = useState(cardFields);
  const [newProperties, setNewProperties] = useState<any>({
    [sortProperty]: laneId,
  });

  const updateProperties = (field: string, value: string | undefined) => {
    setNewProperties((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Properties</CardTitle>
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
              <CommandEmpty>Field not found or already used</CommandEmpty>
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
                    add new field:&nbsp;{searchField}
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
                    key={property + "-value-combo-box"}
                    valueOptions={getValuesForField(property)}
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

const TagsInput = ({
  cardTags,
  setNewCardData,
}: {
  cardTags: string[] | null;
  setNewCardData: React.Dispatch<React.SetStateAction<CardProps>>;
}) => {
  // something
  const [newTags, setNewTags] = useState<string[] | null>(null);
  const [unusedTags, setUnusedTags] = useState(cardTags);

  const addTag = (tag: string) => {
    if (!newTags) {
      setNewTags((_) => [tag]);
      setUnusedTags((prev) => (prev ? prev.filter((t) => t !== tag) : null));
      return;
    }
    if (!newTags.includes(tag)) {
      const updatedTags = newTags ? [...newTags] : [];
      updatedTags.push(tag);

      setNewTags((prev) => [...(prev as string[]), tag]);
    }
    setUnusedTags((prev) => (prev ? prev.filter((t) => t !== tag) : null));
  };

  const removeTag = (tag: string) => {
    if (!newTags) return;
    const updatedTagArr = newTags.filter((t) => t !== tag);
    setNewTags(updatedTagArr);
    if (unusedTags) {
      const newUnusedTags = [...unusedTags];
      newUnusedTags.push(tag);
      setUnusedTags(newUnusedTags);
    }
  };

  useEffect(() => {
    setNewCardData((card) => ({
      ...card,
      tags: newTags,
    }));
  }, [newTags]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Tags</CardTitle>
        <AllTagsSearch addTag={addTag} unusedTags={unusedTags}></AllTagsSearch>
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
      <CardTitle>Selected tags</CardTitle>
      <CardDescription>click to remove</CardDescription>
      {cardTags ? (
        <div className="flex flex-row flex-wrap gap-1">
          {newTags &&
            newTags.map((t) => (
              <Badge
                key={t}
                onClick={(e) =>
                  e &&
                  e.currentTarget &&
                  e.currentTarget.textContent &&
                  removeTag(e.currentTarget.textContent)
                }
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
        <CardTitle className="flex flex-row items-center gap-1">
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

const PropertyValueComboBox = ({
  valueOptions,
  defaultVal,
}: {
  valueOptions: string[] | null;
  defaultVal?: string;
}) => {
  const [chosenValue, setChosenValue] = useState(defaultVal || "click to set");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => console.log(searchValue), [searchValue]);

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
              valueOptions.map((val) => (
                <CommandItem
                  key={val}
                  value={val}
                  onSelect={(v) => setChosenValue(v)}
                >
                  {val}
                </CommandItem>
              ))}
            {/* figure out why this isn't working with searchValue instead of true */}
            {searchValue && (
              <CommandItem
                value={searchValue}
                onSelect={() => setChosenValue(searchValue)}
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
}: {
  updateNewCardData: (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => {
  //
  return (
    <span className="flex flex-row items-center justify-between">
      <Label htmlFor="title">Description</Label>
      <Textarea
        id="text"
        name="text"
        placeholder="Optional notes about doing a thing"
        className="w-3/4"
        onInput={(e) => updateNewCardData(e)}
      />
    </span>
  );
};
