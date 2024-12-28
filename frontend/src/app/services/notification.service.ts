import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';
import { Page } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = `${environment.apiUrl}/api/notifications`;

  read(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Notification>>(this.API_URL, { params });
  }

}
