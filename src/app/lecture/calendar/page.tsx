import { auth } from "@/app/auth"
import { CalendarEvent, getCalendarEvents } from "../../lib/google-calendar"
import { redirect } from "next/navigation"
import CalendarView from "../../components/CalendarView"

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
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Google Calendar</h1>
        <p className="text-gray-600">Welcome, {session.user?.name}</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <CalendarView events={events} />
    </div>
  )
}