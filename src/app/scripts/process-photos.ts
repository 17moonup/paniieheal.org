// scripts/process-photos.ts - TypeScript版本（使用tsx运行）
import dotenv from 'dotenv';
dotenv.config(); // 最先加载环境变量
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { extractExifData } from '../lib/exif.js'
import { addPhoto } from '../lib/photo-utils.js'

async function processPhotosTS() {
  const photosDir = path.join(process.cwd(), 'public', 'photos', 'original')
  const outputDir = path.join(process.cwd(), 'public', 'photos', 'processed')
  const thumbnailDir = path.join(process.cwd(), 'public', 'photos', 'thumbnails')
  
  // 创建输出目录
  await fs.mkdir(outputDir, { recursive: true })
  await fs.mkdir(thumbnailDir, { recursive: true })
  
  try {
    const files = await fs.readdir(photosDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|tiff|raw)$/i.test(file)
    )
    
    console.log(`找到 ${imageFiles.length} 张照片待处理`)
    
    for (const file of imageFiles) {
      const filePath = path.join(photosDir, file)
      const id = crypto.randomUUID()
      const baseName = path.parse(file).name
      
      console.log(`处理照片: ${file}`)
      
      try {
        // 提取EXIF数据
        const exifData = await extractExifData(filePath)
        
        // 处理主图 (最大宽度1920px)
        const processedPath = path.join(outputDir, `${id}.jpg`)
        await sharp(filePath)
          .resize(1920, 1920, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ quality: 90 })
          .toFile(processedPath)
        
        // 生成缩略图 (400x400px)
        const thumbnailPath = path.join(thumbnailDir, `${id}.jpg`)
        await sharp(filePath)
          .resize(400, 400, { 
            fit: 'cover', 
            position: 'center' 
          })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath)
        
        // 构建照片数据并添加到数据库
        const photoData = {
          title: baseName.replace(/[-_]/g, ' '),
          filename: file,
          url: `/photos/processed/${id}.jpg`,
          thumbnail: `/photos/thumbnails/${id}.jpg`,
          takenAt: (exifData?.takenAt && exifData.takenAt instanceof Date && !isNaN(exifData.takenAt.getTime())) 
  ? exifData.takenAt.toISOString() 
  : new Date().toISOString(),
          camera: exifData?.camera || 'Unknown Camera',
          lens: exifData?.lens || 'Unknown Lens',
          settings: {
            aperture: exifData?.aperture || 'Unknown',
            shutterSpeed: exifData?.shutterSpeed || 'Unknown',
            iso: exifData?.iso || 0,
            focalLength: exifData?.focalLength || 'Unknown'
          },
          location: exifData?.location ? 
            `${exifData.location.latitude.toFixed(6)}, ${exifData.location.longitude.toFixed(6)}` : undefined,
          description: `使用 ${exifData?.camera || 'Unknown Camera'} 拍摄的照片`
        }
        
        // 添加到数据库
        const photoId = await addPhoto(photoData)
        console.log(`✓ 处理完成: ${file} (ID: ${photoId})`)
        
      } catch (error) {
        console.error(`✗ 处理失败: ${file}`, error)
      }
    }
    
    console.log('\n✓ 所有照片处理完成!')
    
  } catch (error) {
    console.error('读取照片目录失败:', error)
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('DB URL:', process.env.POSTGRES_URL); // Should show your connection string
  processPhotosTS().catch(console.error)
}

export { processPhotosTS as processPhotos }