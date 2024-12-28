import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormControlConfig } from 'src/app/utils/form';
import { Route } from 'src/app/utils/route';

@Component({
  selector: 'app-registration',
  template: `<app-form [config]="this"></app-form>`,
})
export class RegistrationComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.removeAuth();
  }

  title = 'Registration';
  controls: FormControlConfig[] = [
    {
      name: 'first_name',
      validation: 'required',
    },
    {
      name: 'last_name',
      validation: 'required',
    },
    {
      name: 'email',
      validation: 'required',
    },
    {
      name: 'phone_number',
      validation: 'required',
    },
    {
      name: 'sex',
      type: 'select',
      validation: 'required',
      options: ['male', 'female'],
    },
    {
      name: 'birth_date',
      type: 'date',
      validation: 'required',
    },
    {
      name: 'username',
      validation: 'required',
    },
    {
      name: 'biography',
      type: 'long-text',
      validation: 'required',
    },
    {
      name: 'private',
      type: 'toggle',
      validation: 'required',
    },
    {
      name: 'password',
      type: 'password',
      validation: 'required',
    },
  ];
  serviceName = 'authService';
  methodName = 'register';
  backUrl = Route.LOGIN;

}
