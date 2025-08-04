'use client'

import React, { useState, useEffect } from 'react';
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
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

export default function MonthCalendarView({ events = [], onDateRangeChange }: MonthCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // CSS样式保持不变
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

    .calendar-day.past-day {
      background: #f8f9fa;
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

    .day-number.past-day {
      color: #6b7280;
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

    .event-past {
      opacity: 0.7;
      background: #9ca3af;
      color: white;
    }

    .event-work {
      background: #10b981;
      color: white;
    }

    .event-work::before {
      content: "💼 ";
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

    .event-status {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
      margin-left: 8px;
    }

    .status-past {
      background: #f3f4f6;
      color: #6b7280;
    }

    .status-ongoing {
      background: #dcfce7;
      color: #16a34a;
    }

    .status-upcoming {
      background: #dbeafe;
      color: #2563eb;
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

  // 当月份改变时，通知父组件更新日期范围
  useEffect(() => {
    if (onDateRangeChange) {
      const rangeStart = new Date(startDate);
      const rangeEnd = new Date(endDate);
      
      // 格式化为 ISO 字符串
      onDateRangeChange(
        rangeStart.toISOString().split('T')[0] + 'T00:00:00Z',
        rangeEnd.toISOString().split('T')[0] + 'T23:59:59Z'
      );
    }
  }, [currentDate, onDateRangeChange]);

  // 生成日历网格的所有日期
  const calendarDays = [];
  const currentCalendarDate = new Date(startDate);
  
  while (currentCalendarDate <= endDate) {
    calendarDays.push(new Date(currentCalendarDate));
    currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
  }

  // 检查事件是否为工作相关
  const isWorkEvent = (event: CalendarEvent): boolean => {
    const workKeywords = ['会议', '工作', '项目', '开发', '测试', '部署', '需求', '评审', 'meeting', 'work', 'project', 'dev', 'development'];
    const summary = (event.summary || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    
    return workKeywords.some(keyword => 
      summary.includes(keyword) || description.includes(keyword)
    );
  };

  // 获取指定日期的事件
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    
    return events.filter(event => {
      // 处理全天事件
      if (event.start.date) {
        const eventDate = new Date(event.start.date);
        return eventDate.toDateString() === dateStr;
      }
      
      // 处理有时间的事件
      if (event.start.dateTime) {
        const eventStartDate = new Date(event.start.dateTime);
        return eventStartDate.toDateString() === dateStr;
      }
      
      return false;
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
    return '全天';
  };

  // 获取事件状态
  const getEventStatus = (event: CalendarEvent) => {
    const now = new Date();
    const startTime = new Date(event.start.dateTime || event.start.date || '');
    const endTime = new Date(event.end.dateTime || event.end.date || '');
    
    if (endTime < now) {
      return 'past';
    } else if (startTime <= now && now <= endTime) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  };

  // 获取事件状态文本
  const getEventStatusText = (status: string) => {
    switch (status) {
      case 'past':
        return '已结束';
      case 'ongoing':
        return '进行中';
      case 'upcoming':
        return '即将开始';
      default:
        return '';
    }
  };

  // 获取事件类名
  const getEventClassName = (event: CalendarEvent) => {
    const status = getEventStatus(event);
    
    if (status === 'past') {
      return 'event-past';
    }
    
    if (isWorkEvent(event)) {
      return 'event-work';
    }
    
    switch (event.status) {
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

  // 检查日期是否为过去
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
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
            const isPast = isPastDate(date);
            const dayClassName = `calendar-day ${
              !isCurrentMonth(date) ? 'other-month' : ''
            } ${isPast ? 'past-day' : ''}`;
            
            const dayNumberClassName = `day-number ${
              isToday(date) ? 'today' : 
              !isCurrentMonth(date) ? 'other-month' : 
              isPast ? 'past-day' : ''
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
                      className={`event-item ${getEventClassName(event)}`}
                      title={`${event.summary} - ${formatTime(event)}`}
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
                <h3 className="modal-title">
                  {selectedEvent.summary}
                  <span className={`event-status status-${getEventStatus(selectedEvent)}`}>
                    {getEventStatusText(getEventStatus(selectedEvent))}
                  </span>
                  {isWorkEvent(selectedEvent) && (
                    <span className="event-status" style={{background: '#10b981', color: 'white'}}>
                      工作事项
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div className="modal-details">
                {selectedEvent.start.dateTime ? (
                  <p>
                    <strong>开始时间:</strong> {new Date(selectedEvent.start.dateTime).toLocaleString('zh-CN')}
                  </p>
                ) : (
                  <p>
                    <strong>日期:</strong> {new Date(selectedEvent.start.date || '').toLocaleDateString('zh-CN')} (全天)
                  </p>
                )}
                
                {selectedEvent.end.dateTime && (
                  <p>
                    <strong>结束时间:</strong> {new Date(selectedEvent.end.dateTime).toLocaleString('zh-CN')}
                  </p>
                )}
                
                {selectedEvent.location && (
                  <p>
                    <strong>地点:</strong> {selectedEvent.location}
                  </p>
                )}
                
                <p>
                  <strong>状态:</strong> {selectedEvent.status === 'confirmed' ? '已确认' : 
                                        selectedEvent.status === 'tentative' ? '暂定' : 
                                        selectedEvent.status === 'cancelled' ? '已取消' : '未知'}
                </p>
                
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