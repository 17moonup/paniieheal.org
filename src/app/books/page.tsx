import Link from 'next/link';
import { getSortedBooksData, BookMetadata} from '@/app/lib/books';
import styles from '../ui/book.module.css';

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

  const years = Object.keys(booksByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>
        <Link href='#'>
          <ruby>冊<rt>ㄘㄜˋ</rt></ruby> <ruby>葉<rt>ㄧㄝˋ</rt></ruby> <ruby>集<rt>ㄐㄧˊ</rt></ruby>
        </Link>
      </h1>
      <div className={styles.contentWrapper}>
        {years.map((year) => (
          // 為 <details> 標籤添加 class
          <details key={year} open className={styles.details}>
            {/* 為 <summary> 標籤添加 class */}
            <summary className={styles.summary}>
              <h2> {year} </h2>
            </summary>
            
            {/* 為 <ul> 標籤添加 class */}
            <ul className={styles.bookList}>
              {booksByYear[year].map(({ id, title, author, date }) => (
                // 為 <li> 標籤添加 class
                <li key={id} className={styles.bookItem}>
                  <Link href={`/books/${id}`} className={styles.bookLink}>
                    <h3 className={styles.name}>
                      {title}
                    </h3>
                    <p className={styles.author}>
                      {author} - <time dateTime={date}>{date}</time>
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
