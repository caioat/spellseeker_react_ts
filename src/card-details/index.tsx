import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Scry from "scryfall-sdk";
import CardImage from "./CardImage";
import CardText from "./CardText";
import { parseManaCost } from "../utils/parsers";
import { CardSymbol } from "../reusable-components/cards";

type CardDetailsProps = {
  cardData: Scry.Card;
};

const CardDetails = ({ cardData }: CardDetailsProps) => {
  const { cardName } = useParams();

  const [fetchedCardData, setFetchedCardData] = useState({} as Scry.Card);

  useEffect(() => {
    const fetchCardData = async (cardName: string) => {
      const newCardData = await Scry.Cards.byName(cardName);
      setFetchedCardData(newCardData);
    };

    if (cardName && cardName !== cardData.name) {
      fetchCardData(cardName);
    } else {
      setFetchedCardData(cardData);
    }
  }, [cardData, cardName]);

  const cardNameAndCost = () => {
    return (
      <div>
        <span>{fetchedCardData.name}</span>
        <span>
          {parseManaCost(fetchedCardData.mana_cost || "").map(
            (cardManaCost) => (
              <CardSymbol src={cardManaCost} />
            )
          )}
        </span>
      </div>
    );
  };

  return (
    <>
      <CardImage imageUri={fetchedCardData.image_uris?.normal} />
      {cardNameAndCost()}
      <CardText
        effect={fetchedCardData.oracle_text}
        flavor={fetchedCardData.flavor_text}
      />
    </>
  );
};

export default CardDetails;
