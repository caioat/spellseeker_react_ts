import styled from "styled-components";

type CardImageProps = {
  imageUri?: string;
};

const CardImage = ({ imageUri }: CardImageProps) => {
  return <CardImg src={imageUri} alt="Card" />;
};

export default CardImage;

const CardImg = styled.img`
  max-width: 244px;
  max-height: 340px;
  background-image: none;
`;
