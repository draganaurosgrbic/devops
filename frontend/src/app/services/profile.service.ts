import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/pagination';
import { Profile } from '../models/profile';
import { tap } from 'rxjs';
import { Auth } from '../models/auth';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  private readonly PROFILES_URL = `${environment.apiUrl}/api/profiles`;
  private readonly PROFILE_URL = `${environment.apiUrl}/api/profile`;

  read(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Profile>>(this.PROFILES_URL, { params });
  }

  readPublic(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Profile>>(`${this.PROFILES_URL}/public`, { params });
  }

  readConnections(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Profile>>(`${this.PROFILES_URL}/connections`, { params });
  }

  readConnectionRequests(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Profile>>(`${this.PROFILES_URL}/connection_requests`, { params });
  }

  readProfile() {
    return this.http.get<Profile>(this.PROFILE_URL);
  }

  readOneProfile(id: number) {
    return this.http.get<Profile>(`${this.PROFILE_URL}/${id}`);
  }

  updateProfile(profile: Profile) {
    return this.http.put<Auth>(this.PROFILE_URL, profile).pipe(tap(res => this.storageService.setAuth(res)));
  }

  connect(id: number) {
    return this.http.put<void>(`${this.PROFILE_URL}/connect/${id}`, null);
  }

  accept(id: number) {
    return this.http.put<void>(`${this.PROFILE_URL}/accept/${id}`, null);
  }

  reject(id: number) {
    return this.http.put<void>(`${this.PROFILE_URL}/reject/${id}`, null);
  }

  block(id: number) {
    return this.http.put<void>(`${this.PROFILE_URL}/block/${id}`, null);
  }

}
