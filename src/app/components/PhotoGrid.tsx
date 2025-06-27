// app/photos/components/PhotoGrid.tsx - 照片网格组件
import { getPhotos } from '@/lib/photo-utils'
import { PhotoCard } from './PhotoCard'

export default async function PhotoGrid() {
  const photos = await getPhotos()
  
  if (photos.length === 0) {
    return (
      <div className="empty-state">
        <p>暂无照片</p>
      </div>
    )
  }
  
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  )
}