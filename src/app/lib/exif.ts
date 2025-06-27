import ExifReader from 'exifreader'
import { readFileSync } from 'fs'

export interface ExifData {
  camera: string
  lens: string
  aperture: string
  shutterSpeed: string
  iso: number
  focalLength: string
  takenAt: Date
  location?: {
    latitude: number
    longitude: number
  }
}

export async function extractExifData(imagePath: string): Promise<ExifData | null> {
  try {
    const imageBuffer = readFileSync(imagePath)
    const tags = ExifReader.load(imageBuffer)
    
    const camera = `${tags.Make?.description || ''} ${tags.Model?.description || ''}`.trim()
    const lens = tags.LensModel?.description || tags.LensSpecification?.description || 'Unknown'
    
    const aperture = tags.FNumber?.description || tags.ApertureValue?.description || 'Unknown'
    const shutterSpeed = tags.ExposureTime?.description || tags.ShutterSpeedValue?.description || 'Unknown'
    let iso = 0;
    if (tags.ISOSpeedRatings?.value) {
      iso = typeof tags.ISOSpeedRatings.value === 'number' 
        ? tags.ISOSpeedRatings.value
        : parseInt(tags.ISOSpeedRatings.value.toString(), 10);
    } else if (tags.PhotographicSensitivity?.value) {
      iso = typeof tags.PhotographicSensitivity.value === 'number'
        ? tags.PhotographicSensitivity.value
        : parseInt(tags.PhotographicSensitivity.value.toString(), 10);
    }
    
    const focalLength = tags.FocalLength?.description || 'Unknown'
    
    const dateTime = tags.DateTime?.description || tags.DateTimeOriginal?.description
    const takenAt = dateTime ? new Date(dateTime.replace(/:/g, '-').replace(/ /, 'T')) : new Date()
    
    let location: { latitude: number; longitude: number } | undefined
    if (tags.GPSLatitude && tags.GPSLongitude) {
      location = {
        latitude: parseFloat(tags.GPSLatitude.description),
        longitude: parseFloat(tags.GPSLongitude.description)
      }
    }
    
    return {
      camera: camera || 'Unknown Camera',
      lens,
      aperture,
      shutterSpeed,
      iso,
      focalLength,
      takenAt,
      location
    }
  } catch (error) {
    console.error('提取EXIF数据失败:', error)
    return null
  }
}