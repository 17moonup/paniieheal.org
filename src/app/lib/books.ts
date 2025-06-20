// /lib/books.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const booksDirectory = path.join(process.cwd(), 'public/content/books');

interface BookFrontmatter {
  title: string;
  author: string;
  illustrator?: string;
  date: string;
  genre?: string;
  imageDir?: string;
  isbn?: string;
  blockquote?: string;
}

export interface BookMetadata extends BookFrontmatter {
  id: string;
}

export interface BookData extends BookFrontmatter {
  id: string;
  contentHtml: string;
}

export async function getSortedBooksData(): Promise<BookMetadata[]> {
  try {
    const fileNames = await fs.readdir(booksDirectory);
    
    const booksPromises = fileNames.map(async (fileName) => {
      // 忽略非 .md 文件，例如 .DS_Store
      if (!fileName.endsWith('.md')) {
          return null;
      }
      try {
        const id = encodeURIComponent(fileName.replace(/\.md$/, ''));
        const filePath = path.join(booksDirectory, fileName);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
          id,
          title: data.title || '未知標題',
          author: data.author || '未知作者',
          date: data.date || new Date().toISOString().split('T')[0],
          ...data,
        } as BookMetadata;
      } catch (error) {
        console.error(`處理檔案 ${fileName} 失敗:`, error);
        return null; // 如果單一檔案出錯，返回 null
      }
    });

    const allBooks = await Promise.all(booksPromises);

    // 過濾掉處理失敗的檔案並排序
    return allBooks
      .filter((book): book is BookMetadata => book !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error('讀取圖書目錄失敗:', error);
    return [];
  }
}

export async function getAllBookIds(): Promise<{ slug: string }[]> {
  try {
    const fileNames = await fs.readdir(booksDirectory);
    // 過濾掉非 .md 文件
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => ({
        slug: encodeURIComponent(fileName.replace(/\.md$/, '')),
      }));
  } catch (error) {
    console.error('生成圖書 ID 失敗:', error);
    return [];
  }
}

export async function getBookData(slug: string): Promise<BookData> {
  const decodedSlug = decodeURIComponent(slug);
  const filePath = path.join(booksDirectory, `${decodedSlug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      contentHtml,
      title: data.title || '未知標題',
      author: data.author || '未知作者',
      date: data.date || new Date().toISOString().split('T')[0],
      ...data,
    } as BookData;
  } catch (error) {
    console.error(`獲取圖書數據失敗 (slug: ${slug}):`, error);
    // 拋出錯誤，讓頁面組件的 try...catch 捕獲
    throw new Error(`找不到該圖書: ${slug}`);
  }
}
