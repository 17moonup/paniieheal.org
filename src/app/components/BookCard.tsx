import Card from "./Card";

const BookCard = ({ src }: { src:string }) => {
  return (
    <Card
      src={src}
      title="books"
    />
  );
};

export default BookCard;
