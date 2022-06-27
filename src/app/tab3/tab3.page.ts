/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Place } from '../models';
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
    private alertController: AlertController
  ) {}

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.tipo = e.detail.value;
  }

  async getPlaces() {
    const loading = await this.loadingController.create();
    this.firestoreService.getCollection('Places/', this.tipo).subscribe(
      (res) => {
        console.log('res', res);
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
}
