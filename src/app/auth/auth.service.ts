import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public sendPasswordResetEmail(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  public async signOut(): Promise<void> {
    return firebase.auth().signOut();
  }
}
