import Card from './Card';

const LectureCard = ({ src }: { src: string }) => {
  return (
    <Card
      title="lecture"
      src={src}
    />
  );
};

export default LectureCard;

