import BaseCard from './BaseCard';

const FilmCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/film/covers"
      title="films"
      delay={delay}
    />
  );
};

export default FilmCard;
