import React, { createContext, useState, useContext } from "react";

export type CardProps = {
  title: string;
  id: string;
  description?: string | null;
  text?: string | null;
  tags?: string[] | null;
  properties?: { [key: string]: any } | null;
};

const CardContext = createContext<{
  cards: CardProps[] | null;
  setCards: React.Dispatch<React.SetStateAction<CardProps[] | null>>;
  setCardById: (
    cardId: string,
    cardData: CardProps,
    isToDelete?: boolean,
  ) => void;
}>({
  cards: null,
  setCards: () => {},
  setCardById: () => {},
});

export const CardsProvider = ({
  children,
  localCards,
}: {
  localCards: CardProps[] | null;
  children: any;
}) => {
  const [cards, setCards] = useState<CardProps[] | null>(localCards);
  const setCardById = (
    cardId: string,
    cardData: CardProps,
    isToDelete?: boolean,
  ) => {
    if (!cards) return;
    if (isToDelete) {
      const filteredCards = cards.filter((c) => c.id !== cardId);
      setCards(filteredCards);
      return;
    }

    const foundCardIndex = cards.findIndex((c) => c.id === cardId);
    const copyCards = [...cards];
    copyCards[foundCardIndex] = cardData;
    setCards(copyCards);
  };

  return (
    <CardContext.Provider value={{ cards, setCards, setCardById }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => useContext(CardContext);
