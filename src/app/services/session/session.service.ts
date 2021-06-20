import { Injectable } from '@angular/core';
import { Session } from './session.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private session$: Session | null = null;
  private readonly _session = new BehaviorSubject<Session>(this.session$);

  public get session(): Observable<Session> {
    return this._session.asObservable();
  }

  public get currentSession(): Session | null {
    return this.session$;
  }

  public setSession(session: Partial<Session>) {
    this.session$ = new Session(session);
    this._session.next(this.session$);
  }

  public updateSession(session: Partial<Session>) {
    this.session$ = { ...this.session$, ...session };
    this._session.next(this.session$);
  }

  public clearSession() {
    this.session$ = null;
    this._session.next(this.session$);
  }
}
