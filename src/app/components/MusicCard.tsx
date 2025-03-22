import BaseCard from './BaseCard';

const MusicCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/music/covers"
      title="musics"
      delay={delay}
    />
  );
};

export default MusicCard;
