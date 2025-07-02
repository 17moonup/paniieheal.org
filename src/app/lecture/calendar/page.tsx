import { auth } from "@/auth"
import { CalendarEvent, getCalendarEvents } from "../../lib/google-calendar"
import { redirect } from "next/navigation"
import CalendarView from "../../components/CalendarView"
import "@/ui/lecture.css"

export default async function CalendarPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  let events: CalendarEvent[] = []
  let error = null

  try {
    if (session.accessToken) {
      events = await getCalendarEvents(session.accessToken)
    }
  } catch (err) {
    error = "Failed to load calendar events"
    console.error(err)
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">Google Calendar</h1>
        <p className="welcome-text">Welcome, {session.user?.name}</p>
      </div>
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      
      <CalendarView events={events} />
    </div>
  )
}