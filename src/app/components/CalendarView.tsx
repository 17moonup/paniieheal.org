"use client"

import { CalendarEvent } from "@/lib/google-calendar"

interface CalendarViewProps {
  events: CalendarEvent[]
}

export default function CalendarView({ events }: CalendarViewProps) {
  const formatDate = (dateObj: { dateTime?: string | null; date?: string | null; timeZone?: string | null }) => {
    const dateStr = dateObj.dateTime || dateObj.date
    if (!dateStr) return "No date"
    
    const date = new Date(dateStr)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) return "Invalid date"
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: dateObj.dateTime ? '2-digit' : undefined,
      minute: dateObj.dateTime ? '2-digit' : undefined,
      timeZone: dateObj.timeZone || undefined,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'tentative':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">No upcoming events</h2>
        <p className="text-gray-600">Your calendar is empty for the next few days.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events ({events.length})</h2>
      {events.map((event) => (
        <div key={event.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{event.summary}</h3>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            <p><strong>Start:</strong> {formatDate(event.start)}</p>
            <p><strong>End:</strong> {formatDate(event.end)}</p>
          </div>
          
          {event.location && (
            <p className="text-sm text-gray-600 mb-2">
              <strong>Location:</strong> {event.location}
            </p>
          )}
          
          {event.creator && (
            <p className="text-sm text-gray-600 mb-2">
              <strong>Created by:</strong> {event.creator.displayName || event.creator.email}
            </p>
          )}
          
          {event.description && (
            <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
              {event.description}
            </p>
          )}
          
          {event.htmlLink && (
            <div className="mt-2">
              <a 
                href={event.htmlLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm underline"
              >
                View in Google Calendar
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}