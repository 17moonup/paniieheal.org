import BaseCard from './BaseCard';

const MusicCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/music/covers"
      title="Musics"
      delay={delay}
    />
  );
};

export default MusicCard;
