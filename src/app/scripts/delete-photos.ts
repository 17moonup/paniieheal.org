// scripts/delete-photos.ts
import dotenv from 'dotenv';
dotenv.config();

import { deleteAllPhotos, getPhotosCount } from '../lib/photo-utils.js'
import { promises as fs } from 'fs'
import path from 'path'

async function deletePhotosFromDB() {
  console.log('开始删除数据库中的照片...')
  
  // 显示当前照片数量
  const count = await getPhotosCount()
  console.log(`当前数据库中有 ${count} 张照片`)
  
  if (count === 0) {
    console.log('数据库中没有照片需要删除')
    return
  }
  
  // 删除所有照片
  const success = await deleteAllPhotos()
  
  if (success) {
    console.log('✓ 数据库中的照片已全部删除')
    
    // 可选：同时删除处理过的图片文件
    const processedDir = path.join(process.cwd(), 'public', 'photos', 'processed')
    const thumbnailDir = path.join(process.cwd(), 'public', 'photos', 'thumbnails')
    
    try {
      const processedFiles = await fs.readdir(processedDir)
      const thumbnailFiles = await fs.readdir(thumbnailDir)
      
      // 删除处理过的图片
      for (const file of processedFiles) {
        if (file.endsWith('.jpg')) {
          await fs.unlink(path.join(processedDir, file))
        }
      }
      
      // 删除缩略图
      for (const file of thumbnailFiles) {
        if (file.endsWith('.jpg')) {
          await fs.unlink(path.join(thumbnailDir, file))
        }
      }
      
      console.log('✓ 处理过的图片文件也已删除')
    } catch (error) {
      console.error('删除图片文件时出错:', error)
    }
    
  } else {
    console.error('✗ 删除照片失败')
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  deletePhotosFromDB().catch(console.error)
}

export { deletePhotosFromDB }