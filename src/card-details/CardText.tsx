import { CardSymbol } from "../reusable-components/cards";
import { parseCardTextAndSymbols } from "../utils/parsers";

type CardTextProps = {
  effect?: string | null;
  flavor?: string | null;
};

const CardText = ({ effect, flavor }: CardTextProps) => {
  const parsedCardText = parseCardTextAndSymbols(effect || "");

  return (
    <>
      {parsedCardText.map((cardPhrase, idx) => (
        <p key={idx}>
          {cardPhrase.map((cardText) =>
            cardText.includes("svg") ? <CardSymbol src={cardText} /> : cardText
          )}
        </p>
      ))}
      <p>
        <i>{flavor || ""}</i>
      </p>
    </>
  );
};

export default CardText;
