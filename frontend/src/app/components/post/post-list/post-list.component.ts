import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dislike } from 'src/app/models/dislike';
import { Like } from 'src/app/models/like';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { ButtonConfig } from 'src/app/utils/list';
import { Route } from 'src/app/utils/route';

@Component({
  selector: 'app-post-list',
  template: `<app-list [config]="this"></app-list>`,
})
export class PostListComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  title: string;
  serviceName = 'postService';
  methodName: string;
  hiddenFields = ['id', 'profile_id', 'opinion'];
  richFields = ['text'];
  buttons: ButtonConfig[];
  show_search: boolean;

  ngOnInit() {
    const route = this.router.url.substring(1);
    this.title = 'Profile Posts';

    if (route.includes('posts/public')) {
      this.methodName = 'readPublic';
    } else if (route.includes(Route.MY_POSTS)) {
      this.methodName = 'readMine';
    } else {
      this.methodName = 'read';
    }

    this.setButtons(route);
    this.show_search = false;
  }

  private async setButtons(route: string) {
    if (route.includes('posts/public')) {
      this.buttons = [
        {
          name: 'COMMENTS',
          hidden: () => {
            return false;
          },
          click: async (item: Post) => {
            this.router.navigate(['comments/public', item.id]);
          },
        },
      ];
    } else {
      this.buttons = [
        {
          name: 'LIKE',
          hidden: (item: Post) => item.opinion == 'liked',
          click: async (item: Post) => {
            const like: Like = {
              Id: '',
              profile_id: item.profile_id,
              post_id: item.id
            };
            await this.postService.like(like).toPromise();
            item.opinion = 'liked';
          },
        },
        {
          name: 'DISLIKE',
          hidden: (item: Post) => item.opinion == 'disliked',
          click: async (item: Post) => {
            const dislike: Dislike = {
              Id: '',
              profile_id: item.profile_id,
              post_id: item.id
            };
            await this.postService.dislike(dislike).toPromise();
            item.opinion = 'disliked';
          },
        },
        {
          name: 'RESET',
          hidden: (item: Post) => item.opinion == 'neither',
          click: async (item: Post) => {
            await this.postService.neither(item.id).toPromise();
            item.opinion = 'neither';
          },
        },
        {
          name: 'COMMENTS',
          hidden: () => {
            return false;
          },
          click: async (item: Post) => {
            this.router.navigate(['comments', item.id]);
          },
        },
      ];
    }
  }

}
