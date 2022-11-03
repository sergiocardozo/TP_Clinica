import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  constructor(public auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
      this.user = user;
    })

  }

  isAuth() {
    return this.auth.authState.pipe(map(auth => auth))
  }

  getCurrentUser(){
    return this.auth.authState;
  }

  async logout() {
    localStorage.clear();
    this.auth.signOut();
  }

  async login(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password:string): Promise<any> {
    const resp = await this.auth.createUserWithEmailAndPassword(email, password);
      this.sendEmailVerification()
      
    return resp;
  }

  getUser() {
    let localstorage = localStorage.getItem('usuario-clinica');
    if( localstorage != null) {
      return JSON.parse(localstorage);
    }
  }

  async sendEmailVerification() {
    return (await this.auth.currentUser)?.sendEmailVerification();
  }
}
