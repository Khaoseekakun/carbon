import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: numer;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: numer;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: numer;
    email: string;
  }
}