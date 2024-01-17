import { AuthUser } from "@/pages/api/auth/[...nextauth]";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
  }

  interface Session {
    user: AuthUser;
  }
}
