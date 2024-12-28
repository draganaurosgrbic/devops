import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, Route } from 'src/app/utils/route';
import { StorageService } from 'src/app/services/storage.service';

interface ButtonConfig {
  name: string;
  link: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  buttons: ButtonConfig[];

  get route() {
    return this.router.url;
  }

  ngOnInit() {
    this.buttons = [
      {
        name: 'Login',
        link: `/${Route.LOGIN}`,
      },
      {
        name: 'Registration',
        link: `/${Route.REGISTRATION}`,
      },
      {
        name: 'Add Offer',
        link: `/${Route.OFFER_FORM}`,
      },
      {
        name: 'Offers',
        link: `/${Route.OFFERS}`,
      },
      {
        name: 'User Profiles',
        link: `/${Route.PROFILES}`,
      },
      {
        name: 'Public Profiles',
        link: `/${Route.PUBLIC_PROFILES}`,
      },
      {
        name: 'Connections',
        link: `/${Route.CONNECTIONS}`,
      },
      {
        name: 'Connection Requests',
        link: `/${Route.CONNECTION_REQUESTS}`,
      },
      {
        name: 'Edit Profile',
        link: `/${Route.PROFILE_FORM}`,
      },
      {
        name: 'My Posts',
        link: `/${Route.MY_POSTS}`,
      },
      {
        name: 'Create Post',
        link: `/${Route.POST_FORM}`,
      },
      {
        name: 'Notifications',
        link: `/${Route.NOTIFICATIONS}`,
      },
      {
        name: 'Events',
        link: `/${Route.EVENTS}`
      },
      {
        name: 'Logout',
        link: `/${Route.LOGIN}`,
      },
    ];
  }

  hiddenButton(button: ButtonConfig) {
    const route = this.route.substring(1);
    const link = button.link.substring(1);

    if (this.storageService.getAuth()?.role !== Role.ADMIN) {
      if (link === Route.EVENTS) {
        return true;
      }

      if (link === Route.PUBLIC_PROFILES || link.includes('posts/public') || link.includes('comments/public')) {
        return false;
      }

      const unAuthRoute = route === Route.LOGIN || route === Route.REGISTRATION ||
        ((route.startsWith(Route.PUBLIC_PROFILES) || route.includes('posts/public') || route.includes('comments/public')) && !this.storageService.getAuth());
      if (button.name === 'Logout') {
        return unAuthRoute;
      }

      if (unAuthRoute) {
        return link !== Route.LOGIN && link !== Route.REGISTRATION &&
          link !== Route.PUBLIC_PROFILES && !link.includes('posts/public') && !link.includes('comments/public');
      }
      return link === Route.LOGIN || link === Route.REGISTRATION;
    }

    return link !== Route.EVENTS && button.name !== 'Logout'
  }

}
