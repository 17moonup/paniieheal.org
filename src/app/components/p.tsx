import BaseCard from './BaseCard';

const PhotoCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/photo/covers"
      title="photos"
      delay={delay}
    />
  );
};

export default PhotoCard;
