import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormControlConfig } from 'src/app/utils/form';
import { Role, Route } from 'src/app/utils/route';

@Component({
  selector: 'app-login',
  template: `<app-form [config]="this"></app-form>`,
})
export class LoginComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.removeAuth();
  }

  title = 'Login';
  controls: FormControlConfig[] = [
    {
      name: 'username',
      validation: 'required',
    },
    {
      name: 'password',
      type: 'password',
      validation: 'required',
    },
  ];
  serviceName = 'authService';
  methodName = 'login';
  get backUrl() {
    return this.storageService.getAuth()?.role === Role.USER ? Route.OFFERS : Route.EVENTS
  }

}
