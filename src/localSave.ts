export type AppStyleConfig = {
  theme: "dark" | "light" | "system";
  color: string;
  style: string;
};

type BaseStyleConfig = {
  bg: string;
  border: string;
};

export type BoardConfig = {
  id: string;
  title: string;
  sortProperty: string;
  lanes?: LaneConfig[];
  description?: string;
  notes?: string;
  styleConfig?: BaseStyleConfig;
};

export type LaneConfig = {
  id: string;
  title: string;
  description?: string;
  sortValue: string;
  styleConfig?: BaseStyleConfig;
};

export type CardConfig = {
  id: string;
  title: string;
  board: string;
  properties: Record<string, string>;
  description?: string;
  tags?: string[];
  styleConfig?: BaseStyleConfig;
};

const BOARDS = "boards";
const CARDS = "cards";

/**
 * This is the schema for localStorage
 */
export type LocalStorageSchema = {
  "react-resizable-panels:body-layout": any;
  "react-resizable-panels:app-layout": any;
  "react-resizable-panels:header-layout": any;
  styleConfiguration: AppStyleConfig;
  [BOARDS]: BoardConfig[];
  [CARDS]: CardConfig[];
};

export const getLocalBoards = () => {
  const boardsString = localStorage.getItem(BOARDS);
  if (!boardsString) return undefined;
  try {
    const boards: BoardConfig[] = JSON.parse(boardsString);
    return boards;
  } catch (e) {
    throw new Error("Error occurred when parsing local board data");
  }
};

export const setLocalBoards = (boards: BoardConfig[]) => {
  try {
    const boardsString = JSON.stringify(boards);
    localStorage.setItem(BOARDS, boardsString);
  } catch (e) {
    throw new Error("Error occurred when stringifying board data");
  }
};

export const getLocalCards = () => {
  const cardsString = localStorage.getItem(CARDS);
  if (!cardsString) return undefined;
  try {
    const cards: CardConfig[] = JSON.parse(cardsString);
    return cards;
  } catch (e) {
    throw new Error("Error occurred when parsing local card data");
  }
};

export const setLocalCards = (cardsString: string) => {
  try {
    const cards = JSON.stringify(cardsString);
    localStorage.setItem(CARDS, cards);
  } catch (e) {
    throw new Error("Error occurred when stringifying card data");
  }
};
