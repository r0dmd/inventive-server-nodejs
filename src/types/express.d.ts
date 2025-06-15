import type { Request } from "express";
import type { PublicUser } from "./user";

// NOTE: Because the standard Express Request type in TypeScript doesn't include a `user` property by default, we have 2 options:
// 1. Create a custom interface (e.g., AuthenticatedRequest) that extends Request with a `user` property, and import & use that interface explicitly in every controller.
/* 
export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    role: string;
  };
}
*/
// 2. (Preferred) Augment the existing Express.Request interface globally in a types file (src/types/express.d.ts)
//    to add an optional `user` property, which will be optional because not all requests will have it (e.g., unauthenticated ones). This way, the extended Request is available everywhere without explicit imports, which keeps code DRY and consistent.

// NOTE: On top of that, we also have a custom PublicUser interface with the public user data.
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}
