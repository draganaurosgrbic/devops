import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonConfig } from 'src/app/utils/list';

@Component({
  selector: 'app-comment-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class CommentListComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  title: string;
  serviceName = 'commentService';
  methodName: string;
  hiddenFields = ['id', 'profile_id', 'post_id'];
  buttons: ButtonConfig[];
  show_search: boolean;

  ngOnInit() {
    const route = this.router.url.substring(1);
    this.title = 'Post Comments';

    if (route.includes('comments/public')) {
      this.methodName = 'readPublic';
    } else {
      this.methodName = 'read';
    }

    this.setButtons(route);
    this.show_search = false;
  }

  private async setButtons(route: string) {
    this.buttons = [];
  }

}
