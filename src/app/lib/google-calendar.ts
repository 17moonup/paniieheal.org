import { google, calendar_v3, Auth } from 'googleapis'

export interface CalendarEvent {
  id: string
  summary: string
  description?: string | null
  start: {
    dateTime?: string | null
    date?: string | null
    timeZone?: string | null
  }
  end: {
    dateTime?: string | null
    date?: string | null
    timeZone?: string | null
  }
  location?: string | null
  status: string
  htmlLink?: string | null
  creator?: {
    email?: string | null
    displayName?: string | null
  } | null
}

export async function getCalendarEvents(accessToken: string): Promise<CalendarEvent[]> {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })

  const calendar = google.calendar({ version: 'v3', auth })

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items?.map((event: calendar_v3.Schema$Event) => ({
      id: event.id || '',
      summary: event.summary || 'No title',
      description: event.description || null,
      start: {
        dateTime: event.start?.dateTime || null,
        date: event.start?.date || null,
        timeZone: event.start?.timeZone || null,
      },
      end: {
        dateTime: event.end?.dateTime || null,
        date: event.end?.date || null,
        timeZone: event.end?.timeZone || null,
      },
      location: event.location || null,
      status: event.status || 'unknown',
      htmlLink: event.htmlLink || null,
      creator: event.creator ? {
        email: event.creator.email || null,
        displayName: event.creator.displayName || null,
      } : null,
    })) || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    throw new Error('Failed to fetch calendar events')
  }
}

// 创建一个Google Calendar API类来处理更多操作
export class GoogleCalendarAPI {
  private auth: Auth.OAuth2Client
  private calendar: calendar_v3.Calendar

  constructor(accessToken: string) {
    this.auth = new google.auth.OAuth2()
    this.auth.setCredentials({ access_token: accessToken })
    this.calendar = google.calendar({ version: 'v3', auth: this.auth })
  }

  // 获取日历事件
  async getEvents(options?: {
    calendarId?: string
    timeMin?: string
    timeMax?: string
    maxResults?: number
  }): Promise<CalendarEvent[]> {
    try {
      const response = await this.calendar.events.list({
        calendarId: options?.calendarId || 'primary',
        timeMin: options?.timeMin || new Date().toISOString(),
        timeMax: options?.timeMax,
        maxResults: options?.maxResults || 20,
        singleEvents: true,
        orderBy: 'startTime',
      })

      return response.data.items?.map((event: calendar_v3.Schema$Event) => ({
        id: event.id || '',
        summary: event.summary || 'No title',
        description: event.description || null,
        start: {
          dateTime: event.start?.dateTime || null,
          date: event.start?.date || null,
          timeZone: event.start?.timeZone || null,
        },
        end: {
          dateTime: event.end?.dateTime || null,
          date: event.end?.date || null,
          timeZone: event.end?.timeZone || null,
        },
        location: event.location || null,
        status: event.status || 'unknown',
        htmlLink: event.htmlLink || null,
        creator: event.creator ? {
          email: event.creator.email || null,
          displayName: event.creator.displayName || null,
        } : null,
      })) || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw new Error('Failed to fetch calendar events')
    }
  }

  // 创建日历事件
  async createEvent(event: Partial<CalendarEvent>, calendarId: string = 'primary'): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.insert({
        calendarId,
        requestBody: {
          summary: event.summary,
          description: event.description,
          start: event.start,
          end: event.end,
          location: event.location,
        },
      })

      const createdEvent = response.data
      return {
        id: createdEvent.id || '',
        summary: createdEvent.summary || 'No title',
        description: createdEvent.description || null,
        start: {
          dateTime: createdEvent.start?.dateTime || null,
          date: createdEvent.start?.date || null,
          timeZone: createdEvent.start?.timeZone || null,
        },
        end: {
          dateTime: createdEvent.end?.dateTime || null,
          date: createdEvent.end?.date || null,
          timeZone: createdEvent.end?.timeZone || null,
        },
        location: createdEvent.location || null,
        status: createdEvent.status || 'unknown',
        htmlLink: createdEvent.htmlLink || null,
        creator: createdEvent.creator ? {
          email: createdEvent.creator.email || null,
          displayName: createdEvent.creator.displayName || null,
        } : null,
      }
    } catch (error) {
      console.error('Error creating calendar event:', error)
      throw new Error('Failed to create calendar event')
    }
  }

  // 更新日历事件
  async updateEvent(
    eventId: string, 
    updates: Partial<CalendarEvent>, 
    calendarId: string = 'primary'
  ): Promise<CalendarEvent> {
    try {
      const response = await this.calendar.events.update({
        calendarId,
        eventId,
        requestBody: {
          summary: updates.summary,
          description: updates.description,
          start: updates.start,
          end: updates.end,
          location: updates.location,
        },
      })

      const updatedEvent = response.data
      return {
        id: updatedEvent.id || '',
        summary: updatedEvent.summary || 'No title',
        description: updatedEvent.description || null,
        start: {
          dateTime: updatedEvent.start?.dateTime || null,
          date: updatedEvent.start?.date || null,
          timeZone: updatedEvent.start?.timeZone || null,
        },
        end: {
          dateTime: updatedEvent.end?.dateTime || null,
          date: updatedEvent.end?.date || null,
          timeZone: updatedEvent.end?.timeZone || null,
        },
        location: updatedEvent.location || null,
        status: updatedEvent.status || 'unknown',
        htmlLink: updatedEvent.htmlLink || null,
        creator: updatedEvent.creator ? {
          email: updatedEvent.creator.email || null,
          displayName: updatedEvent.creator.displayName || null,
        } : null,
      }
    } catch (error) {
      console.error('Error updating calendar event:', error)
      throw new Error('Failed to update calendar event')
    }
  }

  // 删除日历事件
  async deleteEvent(eventId: string, calendarId: string = 'primary'): Promise<void> {
    try {
      await this.calendar.events.delete({
        calendarId,
        eventId,
      })
    } catch (error) {
      console.error('Error deleting calendar event:', error)
      throw new Error('Failed to delete calendar event')
    }
  }
}