import { Component } from '@angular/core';

@Component({
  selector: 'app-offer-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class OfferListComponent {

  title = 'Offers';
  serviceName = 'offerService';
  methodName = 'read';
  hiddenFields = ['id'];

}
