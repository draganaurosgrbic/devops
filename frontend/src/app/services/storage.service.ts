import { Injectable } from '@angular/core';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private readonly KEY = 'AUTH';

  getAuth(): Auth {
    return JSON.parse(localStorage.getItem(this.KEY));
  }

  setAuth(auth: Auth) {
    localStorage.setItem(this.KEY, JSON.stringify(auth));
  }

  removeAuth() {
    localStorage.removeItem(this.KEY);
  }

}
