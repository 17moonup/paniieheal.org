'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Calendar, Clock } from 'lucide-react';

// 扩展的事件接口，包含任务信息
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
  // 标识事件类型
  eventType: 'calendar' | 'task';
  // 任务特有属性
  taskList?: string;
  completed?: boolean;
  due?: string;
  notes?: string;
  parent?: string;
  position?: string;
  updated?: string;
}

interface MonthCalendarViewProps {
  events: CalendarEvent[];
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

export default function MonthCalendarView({ events = [], onDateRangeChange }: MonthCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showTasksOnly, setShowTasksOnly] = useState(false);
  const [showEventsOnly, setShowEventsOnly] = useState(false);

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
      margin-bottom: 12px;
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

    .filter-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-button {
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .filter-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .filter-button.active {
      background: white;
      color: #2563eb;
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
      gap: 2px;
    }

    .event-item, .task-item {
      font-size: 11px;
      padding: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: opacity 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .event-item:hover, .task-item:hover {
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

    .task-pending {
      background: #f59e0b;
      color: white;
      border-left: 3px solid #d97706;
    }

    .task-completed {
      background: #10b981;
      color: white;
      border-left: 3px solid #059669;
      text-decoration: line-through;
      opacity: 0.8;
    }

    .task-overdue {
      background: #ef4444;
      color: white;
      border-left: 3px solid #dc2626;
    }

    .task-icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }

    .event-icon {
      width: 10px;
      height: 10px;
      flex-shrink: 0;
    }

    .more-events {
      font-size: 10px;
      color: #6b7280;
      cursor: pointer;
      transition: color 0.2s;
      padding: 2px 4px;
      text-align: center;
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
      max-width: 500px;
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
      display: flex;
      align-items: center;
      gap: 8px;
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
      gap: 12px;
      font-size: 14px;
    }

    .modal-details strong {
      font-weight: 600;
      color: #374151;
    }

    .modal-description, .modal-notes {
      margin-top: 4px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
      border-left: 4px solid #e5e7eb;
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

    .event-status, .task-status {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
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

    .status-completed {
      background: #dcfce7;
      color: #16a34a;
    }

    .status-pending {
      background: #fef3c7;
      color: #d97706;
    }

    .status-overdue {
      background: #fee2e2;
      color: #dc2626;
    }

    .task-list-badge {
      display: inline-block;
      padding: 2px 6px;
      background: #e5e7eb;
      color: #374151;
      border-radius: 8px;
      font-size: 10px;
      margin-left: 4px;
    }

    .task-type-badge {
      display: inline-block;
      padding: 2px 6px;
      background: #f59e0b;
      color: white;
      border-radius: 8px;
      font-size: 10px;
      margin-left: 4px;
    }

    .event-type-badge {
      display: inline-block;
      padding: 2px 6px;
      background: #3b82f6;
      color: white;
      border-radius: 8px;
      font-size: 10px;
      margin-left: 4px;
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

  // 过滤事件
  const getFilteredEvents = () => {
    if (showTasksOnly) {
      return events.filter(event => event.eventType === 'task');
    }
    if (showEventsOnly) {
      return events.filter(event => event.eventType === 'calendar');
    }
    return events;
  };

  // 检查是否为工作相关事件/任务
  const isWorkRelated = (item: CalendarEvent): boolean => {
    const workKeywords = ['会议', '工作', '项目', '开发', '测试', '部署', '需求', '评审', 'meeting', 'work', 'project', 'dev', 'development', '任务', 'task'];
    const summary = (item.summary || '').toLowerCase();
    const description = (item.description || item.notes || '').toLowerCase();
    
    return workKeywords.some(keyword => 
      summary.includes(keyword) || description.includes(keyword)
    );
  };

  // 获取指定日期的事件和任务
  const getItemsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    const filteredEvents = getFilteredEvents();
    
    return filteredEvents.filter(item => {
      if (item.eventType === 'task') {
        // 对于任务，检查due日期
        if (item.due) {
          const dueDate = new Date(item.due);
          return dueDate.toDateString() === dateStr;
        }
        return false;
      } else {
        // 对于日历事件，检查start日期
        if (item.start.date) {
          const eventDate = new Date(item.start.date);
          return eventDate.toDateString() === dateStr;
        }
        
        if (item.start.dateTime) {
          const eventStartDate = new Date(item.start.dateTime);
          return eventStartDate.toDateString() === dateStr;
        }
        
        return false;
      }
    });
  };

  // 获取任务状态
  const getTaskStatus = (task: CalendarEvent) => {
    if (task.completed) {
      return 'completed';
    }
    
    if (task.due) {
      const dueDate = new Date(task.due);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate < now) {
        return 'overdue';
      }
    }
    
    return 'pending';
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

  // 获取状态文本
  const getStatusText = (item: CalendarEvent) => {
    if (item.eventType === 'task') {
      const status = getTaskStatus(item);
      switch (status) {
        case 'completed':
          return '已完成';
        case 'overdue':
          return '已逾期';
        case 'pending':
          return '待完成';
        default:
          return '';
      }
    } else {
      const status = getEventStatus(item);
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
    }
  };

  // 获取项目类名
  const getItemClassName = (item: CalendarEvent) => {
    if (item.eventType === 'task') {
      const status = getTaskStatus(item);
      switch (status) {
        case 'completed':
          return 'task-completed';
        case 'overdue':
          return 'task-overdue';
        case 'pending':
        default:
          return 'task-pending';
      }
    } else {
      const status = getEventStatus(item);
      
      if (status === 'past') {
        return 'event-past';
      }
      
      if (isWorkRelated(item)) {
        return 'event-work';
      }
      
      switch (item.status) {
        case 'confirmed':
          return 'event-confirmed';
        case 'tentative':
          return 'event-tentative';
        case 'cancelled':
          return 'event-cancelled';
        default:
          return 'event-default';
      }
    }
  };

  // 格式化时间显示
  const formatTimeDisplay = (item: CalendarEvent) => {
    if (item.eventType === 'task') {
      return item.due ? new Date(item.due).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) : '';
    } else {
      if (item.start.dateTime) {
        const date = new Date(item.start.dateTime);
        return date.toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
      return '全天';
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

  // 导航函数
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

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
          
          {/* 过滤按钮 */}
          <div className="filter-buttons">
            <button 
              className={`filter-button ${!showTasksOnly && !showEventsOnly ? 'active' : ''}`}
              onClick={() => {
                setShowTasksOnly(false);
                setShowEventsOnly(false);
              }}
            >
              全部显示
            </button>
            <button 
              className={`filter-button ${showEventsOnly ? 'active' : ''}`}
              onClick={() => {
                setShowEventsOnly(!showEventsOnly);
                setShowTasksOnly(false);
              }}
            >
              <Calendar size={14} />
              仅显示日程
            </button>
            <button 
              className={`filter-button ${showTasksOnly ? 'active' : ''}`}
              onClick={() => {
                setShowTasksOnly(!showTasksOnly);
                setShowEventsOnly(false);
              }}
            >
              <CheckCircle size={14} />
              仅显示任务
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
            const dayItems = getItemsForDate(date);
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
                
                {/* 事件和任务列表 */}
                <div className="events-container">
                  {dayItems.slice(0, 4).map(item => (
                    <div
                      key={`${item.eventType}-${item.id}`}
                      onClick={() => setSelectedEvent(item)}
                      className={`${item.eventType === 'task' ? 'task-item' : 'event-item'} ${getItemClassName(item)}`}
                      title={`${item.summary} - ${formatTimeDisplay(item)}`}
                    >
                      {item.eventType === 'task' ? (
                        item.completed ? <CheckCircle className="task-icon" /> : <Circle className="task-icon" />
                      ) : (
                        <Calendar className="event-icon" />
                      )}
                      <span>{formatTimeDisplay(item)} {item.summary}</span>
                    </div>
                  ))}
                  {dayItems.length > 4 && (
                    <div className="more-events">
                      +{dayItems.length - 4} 更多
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 详情弹窗 */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {selectedEvent.eventType === 'task' ? (
                    selectedEvent.completed ? <CheckCircle size={20} /> : <Circle size={20} />
                  ) : (
                    <Calendar size={20} />
                  )}
                  {selectedEvent.summary}
                  <span className={`${selectedEvent.eventType === 'task' ? 'task-status' : 'event-status'} status-${
                    selectedEvent.eventType === 'task' ? getTaskStatus(selectedEvent) : getEventStatus(selectedEvent)
                  }`}>
                    {getStatusText(selectedEvent)}
                  </span>
                  {selectedEvent.eventType === 'task' ? (
                    <span className="task-type-badge">任务</span>
                  ) : (
                    <span className="event-type-badge">日程</span>
                  )}
                  {isWorkRelated(selectedEvent) && (
                    <span className="task-list-badge">工作</span>
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
                {selectedEvent.eventType === 'task' ? (
                  <>
                    {selectedEvent.due && (
                      <p>
                        <strong>截止日期:</strong> {new Date(selectedEvent.due).toLocaleString('zh-CN')}
                      </p>
                    )}
                    
                    {selectedEvent.taskList && (
                      <p>
                        <strong>任务列表:</strong> {selectedEvent.taskList}
                      </p>
                    )}
                    
                    <p>
                      <strong>完成状态:</strong> {selectedEvent.completed ? '已完成' : '未完成'}
                    </p>
                    
                    {selectedEvent.updated && (
                      <p>
                        <strong>最后更新:</strong> {new Date(selectedEvent.updated).toLocaleString('zh-CN')}
                      </p>
                    )}
                    
                    {selectedEvent.notes && (
                      <div>
                        <strong>备注:</strong>
                        <div className="modal-notes">{selectedEvent.notes}</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              
              {selectedEvent.htmlLink && (
                <div className="modal-link">
                  <a
                    href={selectedEvent.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    在Google{selectedEvent.eventType === 'task' ? 'Tasks' : 'Calendar'}中查看
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