import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { Role, Route } from './utils/route';
import { OfferFormComponent } from './components/offer/offer-form/offer-form.component';
import { OfferListComponent } from './components/offer/offer-list/offer-list.component';
import { ProfileListComponent } from './components/profile/profile-list/profile-list.component';
import { ProfileFormComponent } from './components/profile/profile-form/profile-form.component';
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { CommentComponent } from './components/comment/comment/comment.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';

const routes: Routes = [
  {
    path: Route.LOGIN,
    component: LoginComponent,
  },
  {
    path: Route.REGISTRATION,
    component: RegistrationComponent,
  },
  {
    path: Route.OFFER_FORM,
    component: OfferFormComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.OFFERS,
    component: OfferListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.PROFILES,
    component: ProfileListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.PUBLIC_PROFILES,
    component: ProfileListComponent,
  },
  {
    path: Route.CONNECTIONS,
    component: ProfileListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.CONNECTION_REQUESTS,
    component: ProfileListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.PROFILE_FORM,
    component: ProfileFormComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.NOTIFICATIONS,
    component: NotificationListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.EVENTS,
    component: EventListComponent,
    data: { roles: [Role.ADMIN] }
  },
  {
    path: Route.MESSAGE,
    component: ChatComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.POSTS,
    component: PostListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.MY_POSTS,
    component: PostListComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.PUBLIC_POSTS,
    component: PostListComponent,
  },
  {
    path: Route.COMMENTS,
    component: CommentComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: Route.PUBLIC_COMMENTS,
    component: CommentComponent,
  },
  {
    path: Route.POST_FORM,
    component: PostFormComponent,
    data: { roles: [Role.USER] },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: Route.LOGIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
