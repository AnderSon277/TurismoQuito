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
}
