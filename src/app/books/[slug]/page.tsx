// /app/books/[slug]/page.tsx 
// Handle the books .html logic
import { getBookData, getAllBookIds } from '../../lib/books';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
// 匯入自訂文章樣式表
import '../../ui/prose.css';

// 確保只有在建置時定義的路徑是有效的
export const dynamicParams = false;

// 在建置時生成所有靜態路徑
export async function generateStaticParams() {
  const paths = getAllBookIds();
  return paths; 
}

// 為每個靜態頁面動態生成元數據 (SEO)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata>
{
  const { slug } =  await params;
  try {
    const bookData = await getBookData(params.slug);
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
export default async function BookPage({ params }: { params: { slug: string } }) {
  const { slug } =  await params;
  
  try {
    const bookData = await getBookData(slug);
    
    return (
      <div className="body">
        <header className="header">
          <h1>{bookData.title}</h1>
          <div className="details">
            <h2>作者: {bookData.author}</h2>
            <Image 
              className="cover"
              src={ bookData.imageDir }
              alt={ `${bookData.title} cover` }
              height={350}
              width={350}
            ></Image>
            <h2>ISBN: {bookData.isbn}</h2>
            <h2>Record: {bookData.date}</h2>
            {bookData.genre && <h2>類型：{bookData.genre}</h2>}
            <h3> {bookData.blockquote} </h3>
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
