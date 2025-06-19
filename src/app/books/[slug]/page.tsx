// /app/books/[slug]/page.tsx 
// Handle the books .html logic
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBookData, getAllBookIds } from '../../lib/books';
import '../../ui/prose.css';

// 確保只有在建置時定義的路徑是有效的
export const dynamicParams = false;

interface PageProps {
  params: { slug: string };
}

// 在建置時生成所有靜態路徑
export async function generateStaticParams() {
  const paths = getAllBookIds();
  return paths; 
}

// 為每個靜態頁面動態生成元數據 (SEO)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const bookData = await getBookData(params.slug);
  try {
    return {
      title: `${bookData.title} | 圖書介紹`,
      description: `閱讀 ${bookData.author} 的《${bookData.title}》的詳細介紹與筆記。`,
    };
  } catch {
    return {
      title: '未找到圖書',
    };
  }
}

// 頁面
export default async function BookPage({ params }: PageProps) {
  const bookData = await getBookData(params.slug);
  try {
    return (
      <div className="body">
        <header className="header">
          <h1>{bookData.title}</h1>
          
          <div className="details">
            <h2>作者: {bookData.author}</h2>
            <Image 
              src={ bookData.imageDir || "/img/not-found.jpeg"}
              alt={ `${bookData.title} cover` }
              height={350}
              width={350}
            />
            <dl className="detailsList}">
              <dt>作者</dt>
              <dd>{bookData.author}</dd>
              
              <dt>ISBN</dt>
              <dd>{bookData.isbn}</dd>
              
              <dt>紀錄日期</dt>
              <dd><time dateTime={bookData.date}>{bookData.date}</time></dd>
              
              {bookData.genre && (
                <>
                  <dt>類型</dt>
                  <dd>{bookData.genre}</dd>
                </>
              )}
            </dl>
          </div>
        </header>

        {/* 應用自訂的 .prose-container class */}
        <article className="prose-container">
          <div dangerouslySetInnerHTML={{ __html: bookData.contentHtml }} />
        </article>
      </div>
    );
  } catch (_error) {
    notFound();
  }
}
