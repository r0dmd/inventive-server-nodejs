import type { JwtPayload } from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";

// ------------------------------
// Represents the payload stored inside the JWT token, used for token creation and verification, ensuring type safety.
// Extends JwtPayload to include our app-specific user properties. The default JwtPayload only includes standard JWT claims like iat, exp.
// This allows us to reuse the interface consistently for token creation (e.g., loginUserController) and token verification (auth middleware).
export interface TokenPayload extends JwtPayload {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Represents the sanitized, public-facing user object, excluding sensitive fields like password, email, timestamps, etc.
// Safe to send in API responses or attach to req.user after authentication.
export interface PublicUser {
  id: number;
  username: string;
  role: string;
}

// Intersection type combining our domain-level `PublicUser` interface with MySQL2's `RowDataPacket` to satisfy query typing requirements., because even if we are only returning an user, we must satisfy the MySQL2 typing constraints of the query.
// NOTE: Even though `pool.query` always returns an array of rows, having a separate `UserRow` type is useful for typing individual user objects when accessing single elements, e.g., `users[0]`. This separation improves type safety and code clarity when handling both single user and multiple user results.
export type UserRow = PublicUser & RowDataPacket;
export type UserRows = UserRow[]; // An array of `UserRow` objects, representing the entire result set returned by `pool.query`.

// Same as UserRow but for querying a hashed pass.
interface HashedPass {
  password: string;
}
export type HashedPassRow = HashedPass & RowDataPacket;
