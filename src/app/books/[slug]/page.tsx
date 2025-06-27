// /app/books/[slug]/page.tsx
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBookData, getAllBookIds } from '../../lib/books';
import '@/ui/prose.css';

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>; // 修正：params 現在是 Promise 類型
}

export async function generateStaticParams() {
  const paths = await getAllBookIds();
  return paths; 
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    // 修正：await params 後再使用其屬性
    const resolvedParams = await params;
    const bookData = await getBookData(resolvedParams.slug);
    return {
      title: `${bookData.title} | 圖書介紹`,
      description: `閱讀 ${bookData.author} 的《${bookData.title}》的詳細介紹與筆記。`,
    };
  } catch {
    return { title: '未找到圖書' };
  }
}

export default async function BookPage({ params }: PageProps) {
  try {
    // 修正：await params 後再使用其屬性
    const resolvedParams = await params;
    const bookData = await getBookData(resolvedParams.slug);

    return (
      <div className="body-container">
        <header className="header">
          <h1>{bookData.title}</h1>
          <div className="details">
            <h2>作者: {bookData.author}</h2>  
            {bookData.illustrator && <h2>譯註: {bookData.illustrator}</h2>}
            <Image 
              src={bookData.imageDir || "/img/not-found.jpeg"}
              alt={`${bookData.title} cover`}
              height={285}
              width={210}
              priority
            />
            <h2>ISBN: {bookData.isbn || "N/A"}</h2>
            <h2>Record: {bookData.date}</h2>
            {bookData.genre && <h2>類型：{bookData.genre}</h2>}
            <h3> {bookData.blockquote} </h3>  
          </div>
        </header>
        <article className="prose-container">
          <div dangerouslySetInnerHTML={{ __html: bookData.contentHtml }} />
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
//TODO: "1. Book Cover"
//      "2. Genre Function"
//      "3. Multiple Records"