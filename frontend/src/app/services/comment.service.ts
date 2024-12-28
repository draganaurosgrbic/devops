import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/pagination';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private readonly COMMENTS_URL = `${environment.apiUrl}/api/comments`;

  read(search: string, offset: number, limit: number, post_id: string) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Page<Comment>>(`${this.COMMENTS_URL}/${post_id}`, { params });
  }

  readPublic(search: string, offset: number, limit: number, post_id: string) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Page<Comment>>(`${this.COMMENTS_URL}/public/${post_id}`, { params });
  }

  create(comment: any) {
    return this.http.post<void>(this.COMMENTS_URL, comment);
  }

}
