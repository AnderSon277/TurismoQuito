/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public database: AngularFirestore) {}

  createDoc(data: any, path: string) {
    const collection = this.database.collection(path);
    return collection.doc().set(data);
  }

  createUser(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getCollection<tipo>(path: string, type: string) {
    if (type === 'Todo') {
      const collection = this.database.collection(path);
      return collection.valueChanges();
    } else {
      const collection = this.database.collection(path, (ref) =>
        ref.where('type', '==', type)
      );
      return collection.valueChanges();
    }
  }

  getDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }
}
