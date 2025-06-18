import Link from 'next/link';
import { getSortedBooksData, BookMetadata } from '@/app/lib/books';
import styles from '../ui/book.module.css';

const convertToChineseNumerals = (year: number): string => {
  const numerals = ['〇', '一', '二', '三', '四', '五', '陸', '柒', '捌', '玖'];
  const yearStr = year.toString();
  return yearStr
    .split('')
    .map(num => numerals[parseInt(num)])
    .join('');
};

export default function BookListPage() {
  const allBooks: BookMetadata[] = getSortedBooksData();
  const booksByYear = allBooks.reduce<Record<string, BookMetadata[]>>((acc, book) => {
    const year = book.date.substring(0, 4);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(book);
    return acc;
  }, {});

  const years = Object.keys(booksByYear).sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <Link href="#">
          <ruby>冊<rt>ㄘㄜˋ</rt></ruby> <ruby>葉<rt>ㄧㄝˋ</rt></ruby> <ruby>集<rt>ㄐㄧˊ</rt></ruby>
        </Link>
      </div>
      <div className={styles.main}>
          {years.map((year) => (
            <details key={year} open className={styles.details}>
              <summary className={styles.summary}>
                {convertToChineseNumerals(parseInt(year))} 
              </summary>
              <ul className={styles.bookList}>
                {booksByYear[year].map(({ id, title, author }) => (
                  <li key={id} className={styles.bookItem}>
                    <Link href={`/books/${id}`} className={styles.bookLink}>
                      <p className={styles.name}>
                        {title} —— {author}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
      </div>
    </div>
  );
}