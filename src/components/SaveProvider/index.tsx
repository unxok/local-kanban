import { createContext, useContext, useEffect, useState } from "react";
import { BoardConfig } from "../Body/Main";

type Callback<T> = (args: T) => T;

const LocalStorageKeys = {
  BOARDS: "boards",
};

const getLS = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.log("Error in parsing Local Storage: ", e);
      return undefined;
    }
  }
};

const setLS = (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
    return;
  } catch (e) {
    console.log("Application Error-- Couldn't stringify JSON: ", e);
    return;
  }
};

const SaveContext = createContext<{
  boardList: string[] | [];
  // updateBoardList: (callback: Callback<string[]>) => void;
  boardData: Record<string, BoardConfig>;
  updateBoard: (data: BoardConfig, doDelete?: boolean) => void;
}>({
  boardList: [],
  // updateBoardList: () => undefined,
  boardData: {},
  updateBoard: () => undefined,
});

const useSaveContext = () => {
  const ctx = useContext(SaveContext);
  if (!SaveContext) {
    throw new Error(
      "useSaveContext myst be used within a SaveContextProvider!",
    );
  }
  return ctx;
};

// TODO fix the any
const SaveProvider = ({ children }: { children: any }) => {
  const [boardList, setBoardList] = useState<string[]>([]);
  const [boardData, setBoardData] = useState<Record<string, BoardConfig>>({});
  const { BOARDS } = LocalStorageKeys;

  useEffect(() => {
    const bList = getLS(BOARDS) as string[];
    if (!bList) {
      setBoardList([]);
      return;
    }
    setBoardList(bList);
    setBoardData(() =>
      bList.reduce(
        (acc, val) => ({
          ...acc,
          [val]: getLS(val),
        }),
        {},
      ),
    );
    // console.log("heres your boards: ", bList);
  }, []);

  const updateBoardList = (callback: Callback<string[]>) => {
    const newBoards = callback(boardList);
    setBoardList(newBoards);
    setLS(BOARDS, newBoards);
  };

  const updateBoard = (data: BoardConfig, doDelete?: boolean) => {
    // find index in boards array for passed id
    const foundBoardIndex = boardList.indexOf(data.title);

    // if doDelete is true, set boards to the same but filter out found board index
    if (doDelete) {
      updateBoardList((prev) =>
        prev.filter((b) => prev.indexOf(b) !== foundBoardIndex),
      );
      setBoardData((prev) => {
        const prevCopy = { ...prev };
        delete prevCopy[data.title];
        return prevCopy;
      });
    }

    if (foundBoardIndex === -1) {
      updateBoardList((prev) => [...prev, data.title]);
    }

    setBoardData((prev) => ({
      ...prev,
      [data.title]: data,
    }));
    setLS(data.title, data);
  };

  return (
    <SaveContext.Provider value={{ boardList, boardData, updateBoard }}>
      {children}
    </SaveContext.Provider>
  );
};

export { SaveProvider, useSaveContext };
