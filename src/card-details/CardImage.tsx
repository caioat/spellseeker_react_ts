type CardImageProps = {
  imageUri?: string;
};

const CardImage = ({ imageUri }: CardImageProps) => {
  return <img src={imageUri} alt="Card" />;
};

export default CardImage;
