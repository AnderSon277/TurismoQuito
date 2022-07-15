/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import {UserI} from '../models/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  login: boolean = false;
  rol: string;
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.authService.stateUser().subscribe((userlogin) => {
      if (userlogin) {
        console.log('user logeado');
        this.login = true;
        console.log(this.login);
        console.log('uid', userlogin.uid);
        this.firestoreService
          .getDoc<UserI>('Usuarios', userlogin.uid)
          .subscribe((res: any) => {
            console.log('res', res);
            this.rol = res.rol;
            console.log('rol', this.rol);
          });
      } else {
        console.log('not user');
        this.login = false;
        console.log(this.login);
      }
    });
  }

  async logout() {
    await this.authService.logout();
    const alert = await this.alertController.create({
      message: 'Sesión Finalizada',
      buttons: ['Aceptar'],
    });
    await alert.present();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
