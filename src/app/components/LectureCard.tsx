import Card from './Card';

const LectureCard = ({ src }: { src: string }) => {
  return (
    <Card
      title="Lecture"
      src={src}
    />
  );
};

export default LectureCard;

