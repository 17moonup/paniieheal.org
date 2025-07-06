'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 使用你现有的 CalendarEvent 接口
interface CalendarEvent {
  id: string;
  summary: string;
  description?: string | null;
  start: {
    dateTime?: string | null;
    date?: string | null;
    timeZone?: string | null;
  };
  end: {
    dateTime?: string | null;
    date?: string | null;
    timeZone?: string | null;
  };
  location?: string | null;
  status: string;
  htmlLink?: string | null;
  creator?: {
    email?: string | null;
    displayName?: string | null;
  } | null;
}

interface MonthCalendarViewProps {
  events: CalendarEvent[];
}

export default function MonthCalendarView({ events = [] }: MonthCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // CSS样式
  const styles = `
    .calendar-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .calendar-header {
      background: #2563eb;
      color: white;
      padding: 16px;
    }

    .calendar-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .calendar-nav-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .calendar-nav-button {
      padding: 8px;
      background: none;
      border: none;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .calendar-nav-button:hover {
      background: #1d4ed8;
    }

    .calendar-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .today-button {
      padding: 8px 16px;
      background: #3b82f6;
      border: none;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .today-button:hover {
      background: #1d4ed8;
    }

    .weekdays-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .weekday-cell {
      padding: 12px;
      text-align: center;
      font-weight: 500;
      color: #374151;
      border-right: 1px solid #e5e7eb;
    }

    .weekday-cell:last-child {
      border-right: none;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      min-height: 600px;
    }

    .calendar-day {
      border-right: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
      padding: 8px;
      min-height: 96px;
      background: white;
    }

    .calendar-day:last-child {
      border-right: none;
    }

    .calendar-day.other-month {
      background: #f9fafb;
    }

    .day-number {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #111827;
    }

    .day-number.other-month {
      color: #9ca3af;
    }

    .day-number.today {
      background: #2563eb;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .events-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .event-item {
      font-size: 12px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      transition: opacity 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event-item:hover {
      opacity: 0.8;
    }

    .event-confirmed {
      background: #3b82f6;
      color: white;
    }

    .event-tentative {
      background: #eab308;
      color: white;
    }

    .event-cancelled {
      background: #ef4444;
      color: white;
    }

    .event-default {
      background: #6b7280;
      color: white;
    }

    .more-events {
      font-size: 12px;
      color: #6b7280;
      cursor: pointer;
      transition: color 0.2s;
    }

    .more-events:hover {
      color: #374151;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 24px;
      line-height: 1;
    }

    .modal-close:hover {
      color: #6b7280;
    }

    .modal-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 14px;
    }

    .modal-details strong {
      font-weight: 600;
    }

    .modal-description {
      margin-top: 4px;
      padding: 8px;
      background: #f9fafb;
      border-radius: 4px;
    }

    .modal-link {
      margin-top: 16px;
    }

    .modal-link a {
      color: #3b82f6;
      text-decoration: underline;
    }

    .modal-link a:hover {
      color: #1d4ed8;
    }
  `;

  // 获取当前月份的第一天和最后一天
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // 获取日历网格的开始日期（包含上个月的日期）
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  // 获取日历网格的结束日期（包含下个月的日期）
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  // 生成日历网格的所有日期
  const calendarDays = [];
  const currentCalendarDate = new Date(startDate);
  
  while (currentCalendarDate <= endDate) {
    calendarDays.push(new Date(currentCalendarDate));
    currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
  }

  // 获取指定日期的事件
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStartDate = new Date(event.start.dateTime || event.start.date || '');
      return eventStartDate.toDateString() === date.toDateString();
    });
  };

  // 格式化时间
  const formatTime = (event: CalendarEvent) => {
    if (event.start.dateTime) {
      const date = new Date(event.start.dateTime);
      return date.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
    return '';
  };

  // 获取事件状态类名
  const getEventClassName = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'event-confirmed';
      case 'tentative':
        return 'event-tentative';
      case 'cancelled':
        return 'event-cancelled';
      default:
        return 'event-default';
    }
  };

  // 导航到上个月
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 导航到下个月
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 导航到今天
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const today = new Date();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();

  return (
    <>
      <style>{styles}</style>
      <div className="calendar-container">
        {/* 日历头部 */}
        <div className="calendar-header">
          <div className="calendar-nav">
            <div className="calendar-nav-left">
              <button onClick={goToPreviousMonth} className="calendar-nav-button">
                <ChevronLeft size={20} />
              </button>
              <h2 className="calendar-title">
                {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
              </h2>
              <button onClick={goToNextMonth} className="calendar-nav-button">
                <ChevronRight size={20} />
              </button>
            </div>
            <button onClick={goToToday} className="today-button">
              今天
            </button>
          </div>
        </div>

        {/* 星期标题 */}
        <div className="weekdays-header">
          {weekDays.map(day => (
            <div key={day} className="weekday-cell">
              {day}
            </div>
          ))}
        </div>

        {/* 日历网格 */}
        <div className="calendar-grid">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const dayClassName = `calendar-day ${!isCurrentMonth(date) ? 'other-month' : ''}`;
            const dayNumberClassName = `day-number ${
              isToday(date) ? 'today' : !isCurrentMonth(date) ? 'other-month' : ''
            }`;

            return (
              <div key={index} className={dayClassName}>
                <div className={dayNumberClassName}>
                  {date.getDate()}
                </div>
                
                {/* 事件列表 */}
                <div className="events-container">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`event-item ${getEventClassName(event.status)}`}
                      title={event.summary}
                    >
                      {formatTime(event)} {event.summary}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="more-events">
                      +{dayEvents.length - 3} 更多
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 事件详情弹窗 */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedEvent.summary}</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div className="modal-details">
                {selectedEvent.start.dateTime && (
                  <p>
                    <strong>时间:</strong> {new Date(selectedEvent.start.dateTime).toLocaleString('zh-CN')}
                  </p>
                )}
                
                {selectedEvent.location && (
                  <p>
                    <strong>地点:</strong> {selectedEvent.location}
                  </p>
                )}
                
                {selectedEvent.creator && (
                  <p>
                    <strong>创建者:</strong> {selectedEvent.creator.displayName || selectedEvent.creator.email}
                  </p>
                )}
                
                {selectedEvent.description && (
                  <div>
                    <strong>描述:</strong>
                    <div className="modal-description">{selectedEvent.description}</div>
                  </div>
                )}
              </div>
              
              {selectedEvent.htmlLink && (
                <div className="modal-link">
                  <a
                    href={selectedEvent.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    在Google日历中查看
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}