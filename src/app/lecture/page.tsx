import { auth } from "@/app/auth"
import { signIn, signOut } from "@/app/auth"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Google Calendar App</h1>
          
          {session ? (
            <div className="text-center">
              <div className="mb-4">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full mx-auto mb-2"
                  />
                )}
                <p className="text-lg font-semibold">{session.user?.name}</p>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
              
              <div className="space-y-3">
                <Link 
                  href="/calendar" 
                  className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  View Calendar
                </Link>
                
                <form action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}>
                  <button 
                    type="submit"
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-gray-600">Please sign in to access your Google Calendar</p>
              <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/" })
              }}>
                <button 
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                >
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