// lib/books.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Markdown files 
const booksDirectory = path.join(process.cwd(), '/public/content/books');

type FrontmatterValue = string | number | boolean;

export interface BookMetadata {
  id: string; // 從文件名派生
  title: string;
  author: string;
  date: string;
  [key: string]: FrontmatterValue; // 允許其他自訂屬性，且類型安全
}
// 定義單本圖書的完整數據類型 (用於詳情頁)
export interface BookData {
  id: string;
  contentHtml: string;
  title: string;
  author: string;
  date: string;
  isbn: string;
  imageDir: string;
  blockquote: string;
  [key: string]: FrontmatterValue;
}

// 獲取所有圖書的元數據，並按日期排序
export function getSortedBooksData(): BookMetadata[] {
  const fileNames = fs.readdirSync(booksDirectory);
  const allBooksData = fileNames.map((fileName) => {
    // 移除 ".md" 副檔名以作為 id (slug)
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(booksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析元數據
    const matterResult = matter(fileContents);

    // 強制轉換為我們定義的精確類型
    return {
      id,
      ...matterResult.data,
    } as BookMetadata;
  });

  // 根據日期降序排序
  return allBooksData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 獲取所有圖書的 id (slug)，用於 generateStaticParams
export function getAllBookIds() {
  const fileNames = fs.readdirSync(booksDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

// 根據 id (slug) 獲取單本圖書的完整內容
export async function getBookData(slug: string): Promise<BookData> {
  const fullPath = path.join(booksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // 使用 remark 將 markdown 轉換為 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 返回包含 HTML 內容和元數據的完整物件
  return {
    id: slug,
    contentHtml,
    ...matterResult.data,
  } as BookData;
}