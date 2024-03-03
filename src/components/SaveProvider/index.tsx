import { createContext, useContext, useEffect, useState } from "react";

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

// TODO fix the any
const SaveContext = createContext<any>(null);

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
  const [boards, setBoards] = useState<string[]>([]);
  const { BOARDS } = LocalStorageKeys;

  useEffect(() => {
    setBoards(getLS(BOARDS) as string[]);
  }, []);

  const updateBoards = (callback: Callback<string[]>) => {
    const newBoards = callback(boards);
    setBoards(newBoards);
    // localStorage.setItem()
  };

  const updateBoardById = (
    id: string,
    callback: Callback<any>,
    doDelete?: boolean,
  ) => {
    // find index in boards array for passed id
    const foundBoardIndex = boards.findIndex((b) => b === id);
    // if can't find it, just return
    if (foundBoardIndex === -1) return;
    // board was found so use the provided callback to get the updated contents
    const updatedBoard = callback(boards[foundBoardIndex]);
    // if doDelete is true, set boards to the same but filter out found board index
    if (doDelete)
      return setBoards((prev) =>
        prev.filter((b) => prev.indexOf(b) !== foundBoardIndex),
      );
    // if no delete, update the board
    setBoards((prev) => {
      prev[foundBoardIndex] = updatedBoard;
      return prev;
    });
  };

  return (
    <SaveContext.Provider value={{ boards, updateBoards, updateBoardById }}>
      {children}
    </SaveContext.Provider>
  );
};

export { SaveProvider, useSaveContext };
