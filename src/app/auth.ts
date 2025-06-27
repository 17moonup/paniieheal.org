import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  // 添加错误处理
  events: {
    async signIn(message) {
      console.log("Sign in event:", message)
    },
    async signOut(message) {
      console.log("Sign out event:", message)
    },
  },
  // 自定义页面（可选）
  pages: {
    error: '/auth/error',
  },
})