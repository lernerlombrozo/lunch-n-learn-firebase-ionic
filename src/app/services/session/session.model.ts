export class Session {
  public readonly uid: string | null;
  public email: string | null;
  public phoneNumber: string | null;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}
