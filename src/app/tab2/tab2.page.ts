/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { ModalController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { Place } from '../models';

//Position default Quito
let positionInput = {
  lat: -0.22985,
  lng: -78.52495,
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  credentialForm: FormGroup;

  newPlace: Place = {
    name: '',
    description: '',
    type: '',
    ubication: null,
  };

  private path = 'Places/';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.credentialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      ubication: ['', [Validators.required]],
    });
  }

  logs: string[] = [];

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.pushLog('El valor seleccionado es: ' + e.detail.value);
  }

  //Open Modal wiht api in google maps
  /*async openMap() {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();
  }*/

  async savePlace() {
    const loading = await this.loadingController.create();
    this.newPlace.name = this.credentialForm.value.name;
    this.newPlace.description = this.credentialForm.value.description;
    this.newPlace.type = this.credentialForm.value.type;
    await loading.present();
    this.firestoreService.createDoc(this.newPlace, this.path).then(
      async () => {
        loading.dismiss();
        console.log('new Place', this.newPlace);
        const alert = await this.alertController.create({
          header: 'Registro Guardado',
          message: 'Su registro se ha guardado exitosamente',
          buttons: ['OK'],
        });
        await alert.present();
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'failed send the form',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  async addUbication() {
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput },
    });
    await modalAdd.present();

    const { data } = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.newPlace.ubication = data.pos;
      console.log('newPlace -> ', this.newPlace);
    }
  }

  // Easy access for form fields
  get name() {
    return this.credentialForm.get('name');
  }

  get description() {
    return this.credentialForm.get('description');
  }

  get ubication() {
    return this.credentialForm.get('ubication');
  }

  get type() {
    return this.credentialForm.get('type');
  }
}
