/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Component } from '@angular/core';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { ModalController } from '@ionic/angular';

let positionInput = {
  lat: -0.22985,
  lng: -78.52495,
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private modalController: ModalController) {}

  logs: string[] = [];

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.pushLog('El valor seleccionado es: ' + e.detail.value);
  }

  async openMap() {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();
  }
}
