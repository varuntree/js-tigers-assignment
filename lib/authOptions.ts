import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { Account } from "next-auth";
import { Profile } from "next-auth";
import {prisma} from "@/prisma/db"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // The 'account' parameter can be null, so it should be handled accordingly.
      if (account && user.email) {
        try {
          let result = await prisma.user.findFirst({
            where: {
              email: user.email
            }
          });

          if (!result) {
            // User does not exist, so create them.
            const createdUser = await prisma.user.create({
              data: {
                email: user.email
              }
            });
            console.log("New User is created", createdUser);
            user.id = createdUser.id; // Attach new user id to the user object
          } else {
            user.id = result.id; // Attach existing user id to the user object
          }
        } catch (e) {
          console.error("Error in signIn callback:", e);
          return false; // Return false to signal an error
        }
      }
      return true;
    },

    async jwt({ token, user, account }: { token: JWT, user?: User, account?: Account | null, profile?: Profile }) {
      if (user?.id) {
        // If signing in, user object is available
        token.id = user.id; // Use the user.id from the signIn step
      } else if (!token.id && token.email) {
        // If the token does not have an id, try to retrieve it from the database
        const result = await prisma.user.findFirst({
          where: {
            email: token.email // Use email from the token
          }
        });
        token.id = result?.id;
      }
    
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;  // Ensure session's user object gets the user id
      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + '/vendors';
    },
  },
};