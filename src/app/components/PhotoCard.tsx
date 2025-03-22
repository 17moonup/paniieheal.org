import BaseCard from './BaseCard';

const MusicCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/photo/covers"
      title="P_Portfolio"
      delay={delay}
    />
  );
};

export default MusicCard;
