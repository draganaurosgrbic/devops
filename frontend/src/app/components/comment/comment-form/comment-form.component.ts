import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG, SNACKBAR_ERROR_TEXT, SNACKBAR_SUCCESS_CONFIG, SNACKBAR_SUCCESS_TEXT } from 'src/app/utils/popup';
import { CommentService } from 'src/app/services/comment.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private builder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  form = this.builder.group({
    text: ['', [Validators.required, Validators.pattern(new RegExp('\\S'))]],
  });

  pending = false;

  ngOnInit() {
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    const profile = await this.profileService.readProfile().toPromise();
    const id_params = this.route.snapshot.params;

    const value = {
      Id: "",
      text: this.form.value['text'],
      author: profile.first_name + " " + profile.last_name,
      post_id: id_params['id'],
      profile_id: profile.id
    }

    this.pending = true;

    try {
      await this.commentService.create(value).toPromise();
      this.pending = false;
      this.snackbar.open(SNACKBAR_SUCCESS_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_SUCCESS_CONFIG);
    } catch {
      this.pending = false;
      this.snackbar.open(SNACKBAR_ERROR_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG);
    }
  }

}
