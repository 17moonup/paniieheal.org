// app/photos/page.tsx - 主展示页面
import { Suspense } from 'react'
import PhotoGrid from '../components/PhotoGrid'
import '@/ui/photo.css'
import Navgation from '@/components/Navgation'

export default async function PhotosPage() {
  return (
    <>
    <Navgation />
    <div className="photos-container">
      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoGrid />
      </Suspense>
    </div>
    </>
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