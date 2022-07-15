import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {redirectUnauthorizedTo,redirectLoggedInTo,canActivate} from '@angular/fire/auth-guard';
import { TabsPage } from './tabs.page';
const redirectUnauthorizedToLogin =() => redirectUnauthorizedTo(['tabs/login']);
const redirectLoggedInToHome =() => redirectLoggedInTo(['tab1']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../register/register.module').then((m) => m.RegisterPageModule),
      },
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
          ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
          ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
  /*{
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../register/register.module').then((m) => m.RegisterPageModule),
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
