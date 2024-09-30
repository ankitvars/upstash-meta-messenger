import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import Google Provider

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Add your Google client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Add your Google client secret
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect() {
      // Redirect to the base URL or customize as needed
      return process.env.VERCEL_URL || "http://localhost:3000";
    },
  },
};

export default NextAuth(authOptions);
