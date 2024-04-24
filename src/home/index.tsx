import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Scry from "scryfall-sdk";
import CardImage from "../card-details/CardImage";
import useLocalStorage from "../utils/custom-hooks/useLocalStorage";
import { sanitizeCardName } from "../utils/parsers";
import { InputSearchDropdownOptions } from "../reusable-components/inputs";

type HomeProps = {
  cardData: Scry.Card;
  setCardData: React.Dispatch<React.SetStateAction<Scry.Card>>;
};

const Home = ({ cardData, setCardData }: HomeProps) => {
  const navigate = useNavigate();
  const [dailyRandomCard, setDailyRandomCard] = useLocalStorage(
    "dailyRandomCard",
    ""
  );

  useEffect(() => {
    const fetchRandomCardOfTheDay = async () => {
      let randomCardFetched: Scry.Card;
      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);

      if (
        !dailyRandomCard?.date ||
        currentDate.valueOf() !== new Date(dailyRandomCard.date).valueOf()
      ) {
        randomCardFetched = await Scry.Cards.random();
        setDailyRandomCard({
          date: new Date().toDateString(),
          cardName: randomCardFetched.name,
        });
      } else {
        randomCardFetched = await Scry.Cards.byName(dailyRandomCard.cardName);
      }

      setCardData(randomCardFetched);
    };

    if (!cardData.name) fetchRandomCardOfTheDay();
  }, [cardData, setCardData, dailyRandomCard, setDailyRandomCard]);

  const fetchCardList = (searchInput: string) => {
    return Scry.Cards.autoCompleteName(searchInput);
  };

  const toCardDetailsPage = (cardName: string) => {
    navigate(`/carddetails/${sanitizeCardName(cardName)}`);
  };

  return (
    <>
      <div onClick={() => toCardDetailsPage(cardData.name)}>
        <CardImage imageUri={cardData?.image_uris?.normal} />
      </div>
      <div>
        <InputSearchDropdownOptions
          searchFunction={fetchCardList}
          selectionCallback={(cardName: string) => toCardDetailsPage(cardName)}
        />
      </div>
    </>
  );
};

export default Home;
