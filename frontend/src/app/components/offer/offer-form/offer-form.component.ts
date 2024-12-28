import { Component } from '@angular/core';
import { FormControlConfig } from 'src/app/utils/form';
import { Route } from 'src/app/utils/route';

@Component({
  selector: 'app-offer-form',
  template: `<app-form [config]="this"></app-form>`,
})
export class OfferFormComponent {

  title = 'Add Offer';
  controls: FormControlConfig[] = [
    {
      name: 'position',
      validation: 'required',
    },
    {
      name: 'requirements',
      validation: 'required',
    },
    {
      name: 'description',
      validation: 'required',
    },
    {
      name: 'agent_application_link',
      validation: 'required',
    },
  ];
  serviceName = 'offerService';
  methodName = 'create';
  backUrl = Route.OFFERS;

}
