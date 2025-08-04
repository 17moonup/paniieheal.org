// app/photos/components/PhotoCard.tsx - 照片卡片组件
import Image from 'next/image'
import Link from 'next/link'
import '@/ui/photo.css'

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

interface PhotoCardProps {
  photo: Photo
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Link href={`/photos/${photo.id}`} className="photo-card">
      <div className="photo-card-image">
        <Image
          src={photo.thumbnail}
          alt={photo.title}
          fill
          sizes="(max-width: 370px) 1vw, (max-width: 1200px) 20vw, 23vw"
        />
        
        <div className="photo-card-overlay">
          <h3 className="photo-card-title">{photo.title}</h3>
          <div className="photo-card-meta">
            <div className="photo-meta-item">
              <span className="photo-meta-icon">📷</span>
              <span>{photo.camera}</span>
            </div>
            <div className="photo-meta-item">
              <span className="photo-meta-icon">📅</span>
              <span>{new Date(photo.takenAt).toLocaleDateString('zh-CN')}</span>
            </div>
            {photo.location && (
              <div className="photo-meta-item">
                <span className="photo-meta-icon">📍</span>
                <span>{photo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}