import { auth } from "@/auth"
import { signIn, signOut } from "@/auth"
import Link from "next/link"
import Image from "next/image"
import "@/ui/lecture.css"

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="auth-card">
          <h1 className="main-title">Paniieheal Schedule from Google</h1>
          
          {session ? (
            <div className="user-section">
              <div className="user-info">
                {session.user?.image && (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    className="profile-image"
                    width={64}
                    height={64}
                  />
                )}
                <p className="user-name">{session.user?.name}</p>
                <p className="user-email">{session.user?.email}</p>
              </div>
              
              <div className="button-group">
                <Link href="/lecture/calendar" className="btn btn-primary">
                  View Calendar
                </Link>
                
                <form action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}>
                  <button type="submit" className="btn btn-secondary">
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="signin-section">
              <p className="signin-text">Please sign in to access your Google Calendar</p>
              <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/lecture/calendar" })
              }}>
                <button type="submit" className="btn btn-google">
                  Sign in with Google
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}