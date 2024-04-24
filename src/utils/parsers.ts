export const sanitizeCardName = (cardName: string) =>
  cardName.replace(/[^a-zA-Z0-9 ]/g, "");

export const parseManaCost = (manaCost: string) =>
  parseLineTextAndSymbols(manaCost);

//split the card text into an array of lines, then split each line into an array of symbols and text
export const parseCardTextAndSymbols = (cardText: string) => {
  const lines = cardText.split("\n");
  const symbols = [];
  for (let i = 0; i < lines.length; i++) {
    symbols.push(parseLineTextAndSymbols(lines[i]));
  }
  return symbols;
};

//split the mana cost into an array of symbols. The input format is {symbol}{symbol}{symbol} etc.
const parseLineTextAndSymbols = (manaCost: string) => {
  const cardTextAndSymbols = [];
  let text = "";
  for (let i = 0; i < manaCost.length; i++) {
    if (manaCost[i] === "{" && text !== "") {
      cardTextAndSymbols.push(text);
      text = "";
    } else if (manaCost[i] === "}") {
      cardTextAndSymbols.push(
        `https://svgs.scryfall.io/card-symbols/${text.replace(
          /[^a-zA-Z0-9 ]/g,
          ""
        )}.svg`
      );
      text = "";
    } else {
      text += manaCost[i];
    }
  }

  if (text !== "") cardTextAndSymbols.push(text);

  return cardTextAndSymbols;
};
