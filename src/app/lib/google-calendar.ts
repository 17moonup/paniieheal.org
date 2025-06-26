import { google, calendar_v3 } from 'googleapis'

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