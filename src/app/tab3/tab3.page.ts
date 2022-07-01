/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Place } from '../models/models';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  places: Place[] = [];
  logs: string[] = [];
  tipo: string;

  constructor(
    private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.tipo = e.detail.value;
  }

  async getPlaces() {
    const loading = await this.loadingController.create();
    this.firestoreService.getCollection<Place>('Places/', this.tipo).subscribe(
      (res) => {
        console.log('res', res);
        if (Array.isArray(res)) {
          this.places = res as Place[];
        }
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'No se encontraron registros',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  async openMap(positionInput) {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();
  }
}
