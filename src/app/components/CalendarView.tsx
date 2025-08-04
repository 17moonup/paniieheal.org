'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckSquare, Calendar as CalendarIcon } from 'lucide-react';

// 事件接口
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

// 任务接口
interface TaskItem {
  id: string;
  title: string;
  notes?: string | null;
  status: 'needsAction' | 'completed';
  due?: string | null;
  completed?: string | null;
  updated: string;
  listId?: string;
  listTitle?: string;
}

interface TaskList {
  id: string;
  title: string;
  updated: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  taskLists?: TaskList[];
  tasksByList?: Record<string, TaskItem[]>;
  showTasks?: boolean;
  onCompleteTask?: (taskListId: string, taskId: string) => Promise<void>;
  onUncompleteTask?: (taskListId: string, taskId: string) => Promise<void>;
}

export default function CalendarView({ 
  events = [], 
  taskLists = [], 
  tasksByList = {},
  showTasks = true,
  onCompleteTask,
  onUncompleteTask
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // CSS样式 - 扩展原有样式
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

    .today-button, .task-toggle {
      padding: 8px 16px;
      background: #3b82f6;
      border: none;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-left: 8px;
    }

    .today-button:hover, .task-toggle:hover {
      background: #1d4ed8;
    }

    .task-toggle.active {
      background: #10b981;
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

    .items-container {
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

    .task-item {
      font-size: 12px;
      padding: 4px;
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

    .task-item:hover {
      opacity: 0.8;
    }

    .task-needsAction {
      background: #f59e0b;
      color: white;
    }

    .task-completed {
      background: #10b981;
      color: white;
      opacity: 0.7;
    }

    .task-overdue {
      background: #ef4444;
      color: white;
    }

    .task-checkbox {
      width: 12px;
      height: 12px;
      border: 1px solid currentColor;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
    }

    .more-items {
      font-size: 12px;
      color: #6b7280;
      cursor: pointer;
      transition: color 0.2s;
    }

    .more-items:hover {
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

    .task-actions {
      margin-top: 16px;
      display: flex;
      gap: 8px;
    }

    .task-action-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .task-complete-btn {
      background: #10b981;
      color: white;
    }

    .task-complete-btn:hover {
      background: #059669;
    }

    .task-uncomplete-btn {
      background: #f59e0b;
      color: white;
    }

    .task-uncomplete-btn:hover {
      background: #d97706;
    }
  `;

  // 获取当前月份的第一天和最后一天
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // 获取日历网格的开始日期和结束日期
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
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

  // 获取指定日期的任务
  const getTasksForDate = (date: Date) => {
    if (!showTasks) return [];
    
    const allTasks: TaskItem[] = [];
    Object.entries(tasksByList).forEach(([listId, tasks]) => {
      const taskList = taskLists.find(list => list.id === listId);
      tasks.forEach(task => {
        allTasks.push({
          ...task,
          listId,
          listTitle: taskList?.title
        });
      });
    });

    return allTasks.filter(task => {
      if (!task.due) return false;
      const taskDueDate = new Date(task.due);
      return taskDueDate.toDateString() === date.toDateString();
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
      case 'confirmed': return 'event-confirmed';
      case 'tentative': return 'event-tentative';
      case 'cancelled': return 'event-cancelled';
      default: return 'event-default';
    }
  };

  // 获取任务状态类名
  const getTaskClassName = (task: TaskItem) => {
    if (task.status === 'completed') return 'task-completed';
    if (task.due && new Date(task.due) < new Date() && task.status === 'needsAction') {
      return 'task-overdue';
    }
    return 'task-needsAction';
  };

  // 判断任务是否过期
  const isTaskOverdue = (task: TaskItem) => {
    if (!task.due || task.status === 'completed') return false;
    return new Date(task.due) < new Date();
  };

  // 处理任务状态切换
  const handleTaskToggle = async (task: TaskItem) => {
    if (!task.listId) return;
    
    try {
      if (task.status === 'completed') {
        await onUncompleteTask?.(task.listId, task.id);
      } else {
        await onCompleteTask?.(task.listId, task.id);
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
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
            <div>
              <button onClick={goToToday} className="today-button">
                今天
              </button>
              {taskLists.length > 0 && (
                <button 
                  className={`task-toggle ${showTasks ? 'active' : ''}`}
                >
                  <CheckSquare size={16} style={{ marginRight: '4px' }} />
                  {showTasks ? '隐藏任务' : '显示任务'}
                </button>
              )}
            </div>
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
            const dayTasks = getTasksForDate(date);
            const totalItems = dayEvents.length + dayTasks.length;
            const dayClassName = `calendar-day ${!isCurrentMonth(date) ? 'other-month' : ''}`;
            const dayNumberClassName = `day-number ${
              isToday(date) ? 'today' : !isCurrentMonth(date) ? 'other-month' : ''
            }`;

            return (
              <div key={index} className={dayClassName}>
                <div className={dayNumberClassName}>
                  {date.getDate()}
                </div>
                
                {/* 事件和任务列表 */}
                <div className="items-container">
                  {/* 显示事件 */}
                  {dayEvents.slice(0, showTasks ? 2 : 3).map(event => (
                    <div
                      key={`event-${event.id}`}
                      onClick={() => setSelectedEvent(event)}
                      className={`event-item ${getEventClassName(event.status)}`}
                      title={event.summary}
                    >
                      <CalendarIcon size={10} style={{ marginRight: '2px', display: 'inline' }} />
                      {formatTime(event)} {event.summary}
                    </div>
                  ))}
                  
                  {/* 显示任务 */}
                  {showTasks && dayTasks.slice(0, totalItems > 3 ? 1 : 3 - dayEvents.length).map(task => (
                    <div
                      key={`task-${task.id}`}
                      onClick={() => setSelectedTask(task)}
                      className={`task-item ${getTaskClassName(task)}`}
                      title={`${task.title} - ${task.listTitle}`}
                    >
                      <div 
                        className="task-checkbox"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskToggle(task);
                        }}
                      >
                        {task.status === 'completed' && '✓'}
                      </div>
                      {task.title}
                      {isTaskOverdue(task) && ' ⚠️'}
                    </div>
                  ))}
                  
                  {totalItems > 3 && (
                    <div className="more-items">
                      +{totalItems - 3} 更多
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
                <button onClick={() => setSelectedEvent(null)} className="modal-close">
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
                  <a href={selectedEvent.htmlLink} target="_blank" rel="noopener noreferrer">
                    在Google日历中查看
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 任务详情弹窗 */}
        {selectedTask && (
          <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedTask.title}</h3>
                <button onClick={() => setSelectedTask(null)} className="modal-close">
                  ×
                </button>
              </div>
              
              <div className="modal-details">
                <p>
                  <strong>状态:</strong> {selectedTask.status === 'completed' ? '已完成' : '待完成'}
                </p>
                
                {selectedTask.listTitle && (
                  <p>
                    <strong>任务列表:</strong> {selectedTask.listTitle}
                  </p>
                )}
                
                {selectedTask.due && (
                  <p>
                    <strong>到期时间:</strong> {new Date(selectedTask.due).toLocaleString('zh-CN')}
                    {isTaskOverdue(selectedTask) && (
                      <span style={{ color: '#ef4444', marginLeft: '8px' }}>（已过期）</span>
                    )}
                  </p>
                )}
                
                {selectedTask.notes && (
                  <div>
                    <strong>备注:</strong>
                    <div className="modal-description">{selectedTask.notes}</div>
                  </div>
                )}
              </div>
              
              {selectedTask.listId && (
                <div className="task-actions">
                  {selectedTask.status === 'completed' ? (
                    <button
                      onClick={() => handleTaskToggle(selectedTask)}
                      className="task-action-btn task-uncomplete-btn"
                    >
                      标记为未完成
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTaskToggle(selectedTask)}
                      className="task-action-btn task-complete-btn"
                    >
                      标记为完成
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}