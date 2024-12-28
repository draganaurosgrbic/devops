import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class NotificationListComponent {

  title = 'Notifications';
  serviceName = 'notificationService';
  methodName = 'read';
  hiddenFields = ['id', 'recipient_id'];

}
