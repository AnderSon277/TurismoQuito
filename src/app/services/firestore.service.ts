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

  getCollection<tipo>(path: string, type: string) {
    if (type === 'todos') {
      const collection = this.database.collection(path);
      return collection.valueChanges();
    } else {
      const collection = this.database.collection(path, (ref) =>
        ref.where('type', '==', type)
      );
      return collection.valueChanges();
    }
  }
}
