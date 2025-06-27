// app/photos/[id]/page.tsx - 单张照片详情页
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPhotoById } from '@/lib/photo-utils'
import '@/ui/photo.css'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PhotoDetailPage({ params }: PageProps) {
  const { id } = await params;

  const photo = await getPhotoById(id);
  
  if (!photo) {
    notFound()
  }
  
  return (
    <div className="photo-detail-container">
      <Link href="/photos" className="back-link">
        <span className="back-arrow">←</span>
        返回照片列表
      </Link>
      
      <div className="photo-detail-content">
        <div className="photo-detail-image">
          <Image
            src={photo.url}
            alt={photo.title}
            width={800}
            height={600}
            className="detail-image"
            priority
          />
        </div>
        
        <div className="photo-detail-info">
          <div className="photo-header">
            <h1 className="detail-title">{photo.title}</h1>
            {photo.description && (
              <p className="detail-description">{photo.description}</p>
            )}
          </div>
          
          <div className="info-section">
            <h2 className="info-section-title">
              <span className="section-icon">📷</span>
              拍摄信息
            </h2>
            
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">相机</label>
                <p className="info-value">{photo.camera}</p>
              </div>
              <div className="info-item">
                <label className="info-label">镜头</label>
                <p className="info-value">{photo.lens}</p>
              </div>
              <div className="info-item">
                <label className="info-label">拍摄时间</label>
                <p className="info-value">
                  {new Date(photo.takenAt).toLocaleString('zh-CN')}
                </p>
              </div>
              {photo.location && (
                <div className="info-item">
                  <label className="info-label">拍摄地点</label>
                  <p className="info-value">{photo.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="info-section">
            <h2 className="info-section-title">拍摄参数</h2>
            
            <div className="params-grid">
              <div className="param-item">
                <span className="param-icon">🔵</span>
                <div className="param-info">
                  <p className="param-label">光圈</p>
                  <p className="param-value">{photo.settings.aperture}</p>
                </div>
              </div>
              
              <div className="param-item">
                <span className="param-icon">⏱️</span>
                <div className="param-info">
                  <p className="param-label">快门</p>
                  <p className="param-value">{photo.settings.shutterSpeed}</p>
                </div>
              </div>
              
              <div className="param-item">
                <span className="param-icon">⚡</span>
                <div className="param-info">
                  <p className="param-label">ISO</p>
                  <p className="param-value">{photo.settings.iso}</p>
                </div>
              </div>
              
              <div className="param-item">
                <span className="param-icon">🔍</span>
                <div className="param-info">
                  <p className="param-label">焦距</p>
                  <p className="param-value">{photo.settings.focalLength}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}