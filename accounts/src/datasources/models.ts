export type UserRepresentation = {
  id: string;
  username?: string;
  description?: string;
  lastActiveTime: number;
  isLoggedIn: boolean;
}