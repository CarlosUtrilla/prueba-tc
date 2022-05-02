export interface LoginToken {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  error?: string;
}

export interface User {
  uid: string;
  email: string;
  token: string;
  expiresIn: Date;
}
