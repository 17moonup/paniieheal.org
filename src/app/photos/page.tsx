// app/photos/page.tsx - 主展示页面
import { Suspense } from 'react'
import PhotoGrid from '../components/PhotoGrid'
import '@/ui/photo.css'

export default async function PhotosPage() {
  return (
    <div className="photos-container">
      <div className="photos-header">
        <h1 className="photos-title">摄影作品</h1>
        <p className="photos-subtitle">记录生活中的美好瞬间</p>
      </div>
      
      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoGrid />
      </Suspense>
    </div>
  )
}

function PhotoGridSkeleton() {
  return (
    <div className="photo-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="photo-skeleton" />
      ))}
    </div>
  )
}