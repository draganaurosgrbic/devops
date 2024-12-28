import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ButtonConfig } from 'src/app/utils/list';
import { Route } from 'src/app/utils/route';

@Component({
  selector: 'app-profile-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class ProfileListComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { }

  title: string;
  serviceName = 'profileService';
  methodName: string;
  hiddenFields = ['id', 'connections', 'connection_requests', 'blocked_profiles'];
  buttons: ButtonConfig[];

  ngOnInit() {
    const route = this.router.url.substring(1);
    if (route === Route.PROFILES) {
      this.title = 'User Profiles';
      this.methodName = 'read';
    } else if (route === Route.PUBLIC_PROFILES) {
      this.title = 'Public Profiles';
      this.methodName = 'readPublic';
    } else if (route === Route.CONNECTIONS) {
      this.title = 'Connections';
      this.methodName = 'readConnections';
    } else {
      this.title = 'Connection Requests';
      this.methodName = 'readConnectionRequests';
    }

    if (route !== Route.PUBLIC_PROFILES) {
      this.setButtons(route);
    } else {
      this.setButtonsPublic(route);
    }
  }

  private async setButtons(route: string) {
    const profile = await this.profileService.readProfile().toPromise();

    this.buttons = [
      {
        name: 'ACCEPT',
        hidden: () => route !== Route.CONNECTION_REQUESTS,
        click: async (item: Profile) => {
          await this.profileService.accept(item.id).toPromise();
        },
      },
      {
        name: 'CONNECT',
        hidden: (item: Profile) => {
          return route !== Route.PROFILES
            || item.connection_requests.includes(profile.id)
            || profile.connection_requests.includes(item.id)
            || item.connections.includes(profile.id)
            || profile.connections.includes(item.id)
            || item.blocked_profiles.includes(profile.id)
            || profile.blocked_profiles.includes(item.id);
        },
        click: async (item: Profile) => {
          await this.profileService.connect(item.id).toPromise();
        },
      },
      {
        name: 'REJECT',
        hidden: () => route !== Route.CONNECTION_REQUESTS,
        click: async (item: Profile) => {
          await this.profileService.reject(item.id).toPromise();
        },
      },
      {
        name: 'BLOCK',
        hidden: (item: Profile) => {
          return item.blocked_profiles.includes(profile.id)
            || profile.blocked_profiles.includes(item.id);
        },
        click: async (item: Profile) => {
          await this.profileService.block(item.id).toPromise();
        },
      },
      {
        name: 'POSTS',
        hidden: (item: Profile) => {
          return !(item.connections.includes(profile.id)
            && profile.connections.includes(item.id));
        },
        click: async (item: Profile) => {
          this.router.navigate(['posts', item.id]);
        },
      },
      {
        name: 'MESSAGE',
        hidden: (item: Profile) => {
          return (route == Route.PUBLIC_PROFILES || !(item.connections.includes(profile.id)
            && profile.connections.includes(item.id)));
        },
        click: async (item: Profile) => {
          this.router.navigate(['message', profile.id, item.id]);
        },
      },
    ];
  }

  private async setButtonsPublic(route: string) {
    this.buttons = [
      {
        name: 'POSTS',
        hidden: (item: Profile) => {
          return (route != Route.PUBLIC_PROFILES);
        },
        click: async (item: Profile) => {
          this.router.navigate(['posts/public', item.id]);
        },
      },

    ];
  }

}
