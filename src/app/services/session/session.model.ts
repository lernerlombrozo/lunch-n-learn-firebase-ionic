export class Session {
  public readonly uid: string | null;
  public displayName: string | null;
  public email: string | null;
  public emailVerified: boolean;
  public phoneNumber: string | null;
  public photoURL: string | null;
  public firebaseToken?: string;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}
