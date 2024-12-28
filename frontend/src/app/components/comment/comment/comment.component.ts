import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  authorized = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    const route = this.router.url.substring(1);

    if (!route.includes('comments/public')) {
      this.authorized = true;
    };
  }

}
