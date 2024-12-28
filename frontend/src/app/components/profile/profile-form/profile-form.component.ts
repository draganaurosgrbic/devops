import { Component } from '@angular/core';
import { FormControlConfig } from 'src/app/utils/form';

const INTERVAL_MODEL_ELEMENTS: FormControlConfig[] = [
  {
    name: 'name',
    validation: 'required',
  },
  {
    name: 'company',
    validation: 'required',
  },
  {
    name: 'start',
    type: 'date',
    validation: 'required',
  },
  {
    name: 'end',
    type: 'date',
    validation: 'required',
  },
];

const NAME_MODEL_ELEMENTS: FormControlConfig[] = [
  {
    name: 'name',
    validation: 'required',
  },
];

@Component({
  selector: 'app-profile-form',
  template: `<app-form [config]="this"></app-form>`,
})
export class ProfileFormComponent {

  title = 'Edit Profile';
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
      name: 'work_experiences',
      type: 'composite',
      elements: INTERVAL_MODEL_ELEMENTS,
    },
    {
      name: 'educations',
      type: 'composite',
      elements: INTERVAL_MODEL_ELEMENTS,
    },
    {
      name: 'skills',
      type: 'composite',
      elements: NAME_MODEL_ELEMENTS,
    },
    {
      name: 'interests',
      type: 'composite',
      elements: NAME_MODEL_ELEMENTS,
    },
    {
      name: 'block_post_notifications',
      type: 'toggle',
      validation: 'required',
    },
    {
      name: 'block_message_notifications',
      type: 'toggle',
      validation: 'required',
    },
  ];
  serviceName = 'profileService';
  methodName = 'updateProfile';
  initMethodName = 'readProfile';

}
