import type { EmptyObject } from "type-fest";

export type Session = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number;

  user: EmptyObject;
};
