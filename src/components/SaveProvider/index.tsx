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
  updateBoard: (data: BoardConfig, doDelete?: boolean, prevId?: string) => void;
  activeCardId?: string;
  setActiveCardId: React.Dispatch<React.SetStateAction<string | undefined>>;
  checkDuplicate: (
    checkType: "board" | "lane" | "card",
    value: string,
    boardId?: string,
  ) => boolean;
  deleteBoard: (id: string) => void;
}>({
  boardList: [],
  // updateBoardList: () => undefined,
  boardData: {},
  updateBoard: () => undefined,
  activeCardId: "",
  setActiveCardId: () => undefined,
  checkDuplicate: () => true,
  deleteBoard: () => undefined,
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
  const [activeCardId, setActiveCardId] = useState<string>();
  const { BOARDS } = LocalStorageKeys;

  useEffect(() => console.log("boardData changed: ", boardData), [boardData]);

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

  const deleteBoard = (id: string) => {
    setBoardList((prev) => [...prev.filter((b) => b !== id)]);
    setBoardData((prev) => {
      delete prev[id];
      return prev;
    });
    localStorage.removeItem(id);
  };

  const updateBoard = (
    data: BoardConfig,
    doDelete?: boolean,
    prevId?: string,
  ) => {
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

    if (prevId) {
      const foundPrevBoardIndex = boardList.indexOf(prevId);
      if (foundPrevBoardIndex) {
        updateBoardList((prev) => {
          prev[foundPrevBoardIndex] = data.title;
          return prev;
        });
        setBoardData((prev) => {
          delete prev[prevId];
          return {
            ...prev,
            [data.title]: data,
          };
        });
        setLS(data.title, data);
        localStorage.removeItem(prevId);
      }
      return;
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

  /**
   * Checks for duplicate titles based on provided checkType.
   * @param checkType 'board', 'lane', or 'card'
   * @param value The title to check for
   * @param boardId The title of the board to look within. Required if looking for a lane title
   * @param laneId The title of the lane to look within. Required if looking for a card title
   * @returns true if duplicate, false otherwise
   */
  const checkDuplicate = (
    checkType: "board" | "lane" | "card",
    value: string,
    boardId?: string,
  ) => {
    // is duplicate should return true
    if (checkType === "board") {
      const foundIndex = Object.keys(boardData).findIndex(
        (b) => boardData?.[b]?.title === value,
      );
      return foundIndex !== -1;
    }
    if (!boardId)
      throw new Error(
        "Error: Must provide a boardId when looking for a lane or card title",
      );
    if (checkType === "lane") {
      const foundIndex = boardData[boardId].lanes?.findIndex(
        (l) => l.title === value,
      );
      return foundIndex !== undefined && foundIndex !== -1;
    }
    if (checkType === "card") {
      const foundIndex = boardData[boardId].cards?.findIndex(
        (c) => c.title === value,
      );
      return foundIndex !== undefined && foundIndex !== -1;
    }
    throw new Error("Error: Invalid checkType provided");
  };

  return (
    <SaveContext.Provider
      value={{
        boardList,
        boardData,
        updateBoard,
        activeCardId,
        setActiveCardId,
        checkDuplicate,
        deleteBoard,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export { SaveProvider, useSaveContext };
