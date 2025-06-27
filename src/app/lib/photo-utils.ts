// lib/photo-utils.ts - 数据库操作工具
import { createPool } from '@vercel/postgres';

// Initialize the connection pool
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export interface Photo {
  id: string
  title: string
  filename: string
  url: string
  thumbnail: string
  takenAt: string
  camera: string
  lens: string
  settings: {
    aperture: string
    shutterSpeed: string
    iso: number
    focalLength: string
  }
  location?: string
  description?: string
}

// 从数据库获取照片列表
export async function getPhotos(): Promise<Photo[]> {
  try {
    const { rows } = await pool.sql`
      SELECT 
        id, title, filename, url, thumbnail, taken_at,
        camera, lens, aperture, shutter_speed, iso, focal_length,
        location, description
      FROM photos 
      ORDER BY taken_at DESC
    `
    
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      filename: row.filename,
      url: row.url,
      thumbnail: row.thumbnail,
      takenAt: row.taken_at,
      camera: row.camera,
      lens: row.lens,
      settings: {
        aperture: row.aperture,
        shutterSpeed: row.shutter_speed,
        iso: row.iso,
        focalLength: row.focal_length
      },
      location: row.location,
      description: row.description
    }))
  } catch (error) {
    console.error('获取照片列表失败:', error)
    return []
  }
}

// 根据ID获取单张照片
export async function getPhotoById(id: string): Promise<Photo | null> {
  try {
    const { rows } = await pool.sql`
      SELECT 
        id, title, filename, url, thumbnail, taken_at,
        camera, lens, aperture, shutter_speed, iso, focal_length,
        location, description
      FROM photos 
      WHERE id = ${id}
      LIMIT 1
    `
    
    if (rows.length === 0) return null
    
    const row = rows[0]
    return {
      id: row.id,
      title: row.title,
      filename: row.filename,
      url: row.url,
      thumbnail: row.thumbnail,
      takenAt: row.taken_at,
      camera: row.camera,
      lens: row.lens,
      settings: {
        aperture: row.aperture,
        shutterSpeed: row.shutter_speed,
        iso: row.iso,
        focalLength: row.focal_length
      },
      location: row.location,
      description: row.description
    }
  } catch (error) {
    console.error('获取照片详情失败:', error)
    return null
  }
}

// 添加照片到数据库
export async function addPhoto(photo: Omit<Photo, 'id'>): Promise<string> {
  const id = crypto.randomUUID()
  
  try {
    await pool.sql`
      INSERT INTO photos (
        id, title, filename, url, thumbnail, taken_at, camera, lens,
        aperture, shutter_speed, iso, focal_length, location, description
      ) VALUES (
        ${id}, ${photo.title}, ${photo.filename}, ${photo.url}, 
        ${photo.thumbnail}, ${photo.takenAt}, ${photo.camera}, ${photo.lens},
        ${photo.settings.aperture}, ${photo.settings.shutterSpeed}, 
        ${photo.settings.iso}, ${photo.settings.focalLength}, 
        ${photo.location || null}, ${photo.description || null}
      )
    `
    
    return id
  } catch (error) {
    console.error('添加照片失败:', error)
    throw error
  }
}
