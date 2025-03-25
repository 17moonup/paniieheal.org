import BaseCard from './BaseCard';

const BookCard = ({ delay }: { delay: number }) => {
  return (
    <BaseCard
      imageDir="/img/book/covers"
      title="books"
      delay={delay}
    />
  );
};

export default BookCard;
