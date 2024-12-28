import { Component } from '@angular/core';

@Component({
  selector: 'app-event-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class EventListComponent {

  title = 'Events';
  serviceName = 'eventService';
  methodName = 'read';
  hiddenFields = ['id'];

}
