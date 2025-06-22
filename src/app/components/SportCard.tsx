import Card from "./Card";

const SportCard = ({ src }: { src: string }) => {
  return (
    <Card
      title="sports"
      src={src}
    />
  );
};

export default SportCard;