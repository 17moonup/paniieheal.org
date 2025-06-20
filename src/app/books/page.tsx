// /app/books/page.tsx (原 page1.tsx)
import Link from 'next/link';
import { getSortedBooksData, BookMetadata } from '../lib/books'; // 假設您已配置 @/ 指向 src 或根目錄
import styles from '../ui/book.module.css';

const convertToChineseNumerals = (year: number): string => {
  const numerals = ['〇', '一', '二', '三', '四', '五', '陸', '柒', '捌', '玖'];
  return year.toString().split('').map(num => numerals[parseInt(num)]).join('');
};

export default async function BookListPage() {
  const allBooks: BookMetadata[] = await getSortedBooksData();
  const booksByYear = allBooks.reduce<Record<string, BookMetadata[]>>((acc, book) => {
    // 安全地處理日期
    if (book.date) {
      const year = book.date.substring(0, 4);
      if (!acc[year]) acc[year] = [];
      acc[year].push(book);
    }
    return acc;
  }, {});
  
  const years = Object.keys(booksByYear).sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <Link href="/books">
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
              {booksByYear[year].map(({ id, title, author, illustrator }) => (
                <li key={id} className={styles.bookItem}>
                  <Link href={`/books/${id}`} className={styles.bookLink}>
                    <p className={styles.name}>
                      {title} —— {author} 
                      {illustrator && ` / ${illustrator}`}
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
