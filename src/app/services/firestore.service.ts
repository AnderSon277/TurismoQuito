/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public database: AngularFirestore) {}

  async createDoc(data: any, path: string) {
    const collection = this.database.collection(path);
    try {
      const respuesta = await fetch(environment.ApiSheetUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: data.name,
          Descripción: data.description,
          Tipo: data.type,
          Lat: data.ubication.lat,
          Lng: data.ubication.lng,
        }),
      });
      const contenido = await respuesta.json();
      console.log('Contenido', contenido);
    } catch (error) {
      console.log(error);
    }
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

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }
}
