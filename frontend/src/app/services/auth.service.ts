import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth, Login, Registration } from '../models/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  private readonly API_URL = `${environment.apiUrl}/auth`;

  auth() {
    return this.http.get<void>(this.API_URL);
  }

  login(login: Login) {
    return this.http.post<Auth>(`${this.API_URL}/login`, login).pipe(tap(res => this.storageService.setAuth(res)));
  }

  register(registration: Registration) {
    return this.http.post<void>(`${this.API_URL}/registration`, registration);
  }
}
