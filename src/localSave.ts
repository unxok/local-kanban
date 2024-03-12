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
  notes?: string;
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

export const setLocalCards = (cards: CardConfig[]) => {
  try {
    const cardsString = JSON.stringify(cards);
    localStorage.setItem(CARDS, cardsString);
  } catch (e) {
    throw new Error("Error occurred when stringifying card data");
  }
};

/**
 * Given a blob, returns a encoded base64 string
 * @param blob A blob
 * @returns base64 string encoded blob
 */
export const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onloadend = () => res(r.result as string);
    r.onerror = (e) => rej(e);
    r.readAsDataURL(blob);
  });
};

/**
 * Given search terms, returns random base64 encoded image
 * @param searchTerms A string that is a comma separted list of words
 * @returns base64 string encoding of image
 */
export const getRandomImageBase64 = async (searchTerms: string) => {
  const res = await fetch(
    `https://source.unsplash.com/random/1920x1080?${searchTerms}`,
  );
  const blob = await res.blob();
  const base64 = await blobToBase64(blob);
  return base64;
};

export const loadThemeCss = () => {
  const str = localStorage.getItem("themeCss");
  if (!str) return;
  const foundTag = document.getElementById("themeCss");
  if (foundTag) {
    foundTag.innerText = str;
    return;
  }
  const styleTags = document.querySelectorAll("style");
  const lastStyleTag = styleTags[styleTags.length - 1];
  const newStyleTag = document.createElement("style");
  newStyleTag.id = "themeCss";
  newStyleTag.innerText = str;
  lastStyleTag.insertAdjacentElement("afterend", newStyleTag);
};

export const saveThemeCss = (str: string) => {
  localStorage.setItem("themeCss", str);
};
