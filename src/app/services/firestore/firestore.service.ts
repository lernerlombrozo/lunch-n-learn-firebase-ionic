import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public addDocument(collection: string, data: {}): Promise<any> {
    return this.getCollectionRef(collection).add(data);
  }

  public setOrOverwriteDocument(collection: string, document: string, data: any): Promise<any> {
    return this.getDocumentRef(collection, document).set(data);
  }

  public setOrMergeDocument(collection: string, document: string, data: any): Promise<any> {
    return this.getDocumentRef(collection, document).set(data, { merge: true });
  }

  public updateDocument(collection: string, document: string, data: any): Promise<any> {
    return this.getDocumentRef(collection, document).update(data);
  }

  public deleteDocument(collection: string, document: string) {
    return this.getDocumentRef(collection, document).delete();
  }

  public deleteDocumentField(collection: string, document: string, field) {
    const data = {
      [field]: firebase.firestore.FieldValue.delete(),
    };
    return this.updateDocument(collection, document, data);
  }

  public getCollection(collection: string): Observable<any> {
    return new Observable(subscriber => {
      this.getCollectionRef(collection)
        .get()
        .then(snapshot => {
          subscriber.next(snapshot);
        });
    });
  }

  public getDocument(collection: string, document: string): Observable<any> {
    return new Observable(subscriber => {
      this.getDocumentRef(collection, document)
        .get()
        .then(snapshot => {
          subscriber.next(snapshot);
        });
    });
  }

  public listenCollection(collection: string): Observable<any[]> {
    return new Observable(subscriber => {
      this.getCollectionRef(collection).onSnapshot(collection => {
        const collectionData = [];
        collection.forEach(doc => {
          collectionData.push(doc.data());
        });
        subscriber.next(collectionData);
      });
    });
  }

  public listenDocument(collection: string, document: string): Observable<any> {
    return new Observable(subscriber => {
      this.getDocumentRef(collection, document).onSnapshot(doc => {
        console.log('Current data: ', doc.data());
      });
    });
  }

  private getDocumentRef(collection: string, document: string): firebase.firestore.DocumentReference {
    return this.getCollectionRef(collection).doc(document);
  }

  private getCollectionRef(collection: string): firebase.firestore.CollectionReference {
    return firebase.firestore().collection(collection);
  }
}
