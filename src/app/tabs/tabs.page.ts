/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  login: boolean = false;
  rol: string;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {
    this.authService.stateUser().subscribe((userlogin) => {
      if (userlogin) {
        console.log('user logeado');
        this.login = true;
        console.log(this.login);
        this.firestoreService
          .getDoc('Usuarios/', userlogin.uid)
          .subscribe((res: any) => {
            this.rol = res.rol;
          });
      } else {
        console.log('not user');
        this.login = false;
        console.log(this.login);
      }
    });
  }
}
