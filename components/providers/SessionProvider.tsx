"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define session shape
interface Session {
  id: string;
  email: string;
  username?: string;
  org_id?: string;
  phone?: string;
  picture?: string;
  token: string;
  type: 'person' | 'organization',
  isVerified : boolean
}

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // แปลง base64url -> base64
        const base64 = token.split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .padEnd(token.split(".")[1].length + (4 - token.split(".")[1].length % 4) % 4, "=");

        const payload = JSON.parse(atob(base64));

        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
          console.log("Token expired, logging out");
          handleLogout();
        } else {
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          setSession({
            ...userData,
            token,
          });
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSession(null);
    router.push("/auth/signin");
  };

  return (
    <SessionContext.Provider value={{ session, loading, logout: handleLogout }}>
      {children}
    </SessionContext.Provider>
  );
}
