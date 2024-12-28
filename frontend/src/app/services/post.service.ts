import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/pagination';
import { Post } from '../models/post';
import { Like } from '../models/like';
import { Dislike } from '../models/dislike';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) { }

  private readonly POSTS_URL = `${environment.apiUrl}/api/posts`;

  read(search: string, offset: number, limit: number, profile_id: number) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Page<Post>>(`${this.POSTS_URL}/${profile_id}`, { params });
  }

  readMine(search: string, offset: number, limit: number, profile_id: number) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Page<Post>>(`${this.POSTS_URL}/private/mine`, { params });
  }

  readPublic(search: string, offset: number, limit: number, profile_id: number) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<Page<Post>>(`${this.POSTS_URL}/public/${profile_id}`, { params });
  }

  create(post: any) {
    return this.http.post<void>(this.POSTS_URL, post);
  }

  like(like: Like) {
    return this.http.post<void>(`${this.POSTS_URL}/like`, like);
  }

  dislike(dislike: Dislike) {
    return this.http.post<void>(`${this.POSTS_URL}/dislike`, dislike);
  }

  neither(id: string) {
    return this.http.delete<void>(`${this.POSTS_URL}/neither/${id}`);
  }

  upload(img: File) {
    return this.http.post<any>(`${this.POSTS_URL}/upload`, img);
  }
}
