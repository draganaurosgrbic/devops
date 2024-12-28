import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CommentService } from './comment.service';
import { EventService } from './event.service';
import { NotificationService } from './notification.service';
import { OfferService } from './offer.service';
import { PostService } from './post.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    public offerService: OfferService,
    public notificationService: NotificationService,
    public eventService: EventService,
    public postService: PostService,
    public commentService: CommentService
  ) { }
}
