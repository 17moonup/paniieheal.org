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

  // 获取事件状态颜色
  const getEventColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500 text-white';
      case 'tentative':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 日历头部 */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition-colors"
          >
            今天
          </button>
        </div>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {weekDays.map(day => (
          <div key={day} className="p-3 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7" style={{ minHeight: '600px' }}>
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          return (
            <div
              key={index}
              className={`border-r border-b last:border-r-0 p-2 min-h-24 ${
                isCurrentMonth(date) ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday(date) 
                  ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                  : isCurrentMonth(date) 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
              }`}>
                {date.getDate()}
              </div>
              
              {/* 事件列表 */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getEventColor(event.status)}`}
                    title={event.summary}
                  >
                    <div className="truncate">
                      {formatTime(event)} {event.summary}
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{selectedEvent.summary}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
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
                  <p className="mt-1 p-2 bg-gray-50 rounded">{selectedEvent.description}</p>
                </div>
              )}
            </div>
            
            {selectedEvent.htmlLink && (
              <div className="mt-4">
                <a
                  href={selectedEvent.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  在Google日历中查看
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}