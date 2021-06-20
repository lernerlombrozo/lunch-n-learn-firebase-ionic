import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  public write(ref: string, data: any): Promise<any> {
    return this.getRef(ref).set(data);
  }

  public post(ref: string, data: any): Promise<any> {
    return this.getRef(ref).push().set(data);
  }

  public listen(ref: string): Observable<any> {
    return this.listenEvent('value', ref);
  }

  public listenNewPosts(ref: string): Observable<any> {
    return this.listenEvent('child_added', ref);
  }

  public get(ref: string): Observable<any> {
    return new Observable(subscriber => {
      this.getRef(ref)
        .once('value')
        .then(snapshot => {
          subscriber.next(snapshot.val());
        });
    });
  }

  private listenEvent(event: 'value' | 'child_added', ref: string): Observable<any> {
    return new Observable(subscriber => {
      this.getRef(ref).on(event, snapshot => {
        subscriber.next(snapshot.val());
      });
    });
  }

  private getRef(ref: string): firebase.database.Reference {
    return firebase.database().ref(ref);
  }
}
