import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserI } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private authFire: AngularFireAuth) {}

  async register(user: UserI) {
    try {
      const useregister = await this.authFire.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      return useregister;
    } catch (e) {
      return null;
    }
  }
  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }
  logout() {
    return signOut(this.auth);
  }

  stateUser() {
    const userState = this.authFire.authState;
    return userState;
  }
}
