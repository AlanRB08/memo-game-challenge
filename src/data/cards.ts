import starIcon from "../assets/star.svg";
import moonIcon from "../assets/moon.svg";
import sunIcon from "../assets/sun.svg";
import cometIcon from "../assets/comet.svg";

export type CardSymbol = "star" | "moon" | "sun" | "comet";

export type MemoryCardData = {
  id: string;
  symbol: CardSymbol;
  icon: string;
  label: string;
};

const cardItems: Array<{
  symbol: CardSymbol;
  icon: string;
  label: string;
}> = [
  {
    symbol: "star",
    icon: starIcon,
    label: "Star",
  },
  {
    symbol: "moon",
    icon: moonIcon,
    label: "Moon",
  },
  {
    symbol: "sun",
    icon: sunIcon,
    label: "Sun",
  },
  {
    symbol: "comet",
    icon: cometIcon,
    label: "Comet",
  },
];

function shuffleCards(cards: MemoryCardData[]) {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledCards[index], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[index],
    ];
  }

  return shuffledCards;
}

export function createShuffledCards() {
  const cards = cardItems.flatMap((card) => [
    {
      id: `${card.symbol}-1`,
      symbol: card.symbol,
      icon: card.icon,
      label: card.label,
    },
    {
      id: `${card.symbol}-2`,
      symbol: card.symbol,
      icon: card.icon,
      label: card.label,
    },
  ]);

  return shuffleCards(cards);
}
