import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';
import { Page } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class OfferService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = `${environment.apiUrl}/api/offers`;

  create(offer: Offer) {
    return this.http.post<void>(this.API_URL, offer);
  }

  read(search: string, offset: number, limit: number) {
    const params = new HttpParams().set('search', search).set('offset', offset).set('limit', limit);
    return this.http.get<Page<Offer>>(this.API_URL, { params });
  }

}
