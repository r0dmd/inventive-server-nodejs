import type { JwtPayload } from "jsonwebtoken";

// We extend the JwtPayload interface to include our custom user properties (id, username, role)
// because the default JwtPayload only includes standard JWT claims (like iat, exp).
// This ensures TS knows about our expected token's specific shape, providing type safety
// and better developer experience when accessing token fields throughout the app.
export interface TokenPayload extends JwtPayload {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
