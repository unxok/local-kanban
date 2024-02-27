import React, { createContext, useState, useContext, useEffect } from "react";

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
  cardTags: string[] | null;
  cardFields: string[] | null;
  getValuesForField: (field: any) => any;
  getCardsByPropValue: (
    propertyName: string,
    propertyValue: string,
  ) => CardProps[] | undefined;
}>({
  cards: null,
  setCards: () => {},
  setCardById: () => {},
  cardTags: null,
  cardFields: null,
  getValuesForField: () => {},
  getCardsByPropValue: () => undefined,
});

export const CardsProvider = ({
  children,
  // localCards,
}: {
  // localCards: CardProps[] | null;
  children: any;
}) => {
  const [cards, setCards] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const lsCards = localStorage.getItem("cards");
    if (!lsCards) return;
    const parsedCards = JSON.parse(lsCards);
    setCards(parsedCards);
  }, []);

  const setCardById = (
    cardId: string,
    cardData: CardProps,
    isToDelete?: boolean,
  ) => {
    if (!cards && !isToDelete) {
      setCards([cardData]);
      localStorage.setItem("cards", JSON.stringify(cardData));
    }
    if (!cards && isToDelete) {
      return;
    }
    if (isToDelete) {
      // @ts-ignore TODO typescript dumb?
      const filteredCards = cards.filter((c) => c.id !== cardId);
      setCards(filteredCards);
      localStorage.setItem("cards", JSON.stringify(filteredCards));
      return;
    }

    // @ts-ignore TODO typescript dumb?
    const foundCardIndex = cards.findIndex((c) => c.id === cardId);
    if (foundCardIndex === -1) {
      // @ts-ignore TODO typescript dumb?
      setCards([...cards, cardData]);
      localStorage.setItem("cards", JSON.stringify([...cards, cardData]));
      return;
    }
    const copyCards = [...cards];
    copyCards[foundCardIndex] = cardData;
    setCards(copyCards);
    localStorage.setItem("cards", JSON.stringify(copyCards));
  };

  const potentialCardTagsArr = !cards
    ? null
    : cards
        .map((card) => (card.tags ? [...card.tags] : null))
        .flat()
        .filter((tag) => !!tag);

  const potentialCardTags =
    potentialCardTagsArr && potentialCardTagsArr.length
      ? Array.from(new Set(potentialCardTagsArr))
      : [null];
  const cardTags = potentialCardTags ? potentialCardTags : null;

  const potentialCardValuesArr = cards?.reduce(
    (acc, card) => {
      Object.keys(card?.properties || {}).forEach((field) => {
        if (!acc.hasOwnProperty(field)) {
          // @ts-ignore TODO
          acc[field] = [card.properties[field]];
          return acc;
        }
        // @ts-ignore TODO
        acc[field].push(card.properties[field]);
        return acc;
      });
      return acc;
    },
    {} as { [key: string]: any },
  );
  const cardValues = !potentialCardValuesArr
    ? null
    : Object.keys(potentialCardValuesArr).reduce((acc, field) => {
        acc[field] = Array.from(new Set(potentialCardValuesArr[field]));
        return acc;
      }, potentialCardValuesArr);

  const cardFields = cardValues ? Object.keys(cardValues) : null;
  // console.log("fields: ", cardFields);
  // console.log("values: ", cardValues);

  // @ts-ignore TODO
  const getValuesForField = (field) => (cardValues ? cardValues[field] : null);
  const getCardsByPropValue = (propertyName: string, propertyValue: string) => {
    return cards?.filter(
      (c) => c.properties && c.properties[propertyName] === propertyValue,
    );
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        setCardById,
        // @ts-ignore TODO I guess I'm not typing this right because I have checked that it isn't null[] already
        cardTags,
        cardFields,
        getValuesForField,
        getCardsByPropValue,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => useContext(CardContext);
