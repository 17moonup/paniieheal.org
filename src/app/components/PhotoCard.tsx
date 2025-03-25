import BaseCard from './BaseCard';

const MusicCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/photo/covers"
      title="p_portfolio"
      delay={delay}
    />
  );
};

export default MusicCard;
