import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG, SNACKBAR_ERROR_TEXT, SNACKBAR_SUCCESS_CONFIG, SNACKBAR_SUCCESS_TEXT } from 'src/app/utils/popup';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Route } from 'src/app/utils/route';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  constructor(
    private postService: PostService,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private builder: FormBuilder
  ) { }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Aa',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
    uploadUrl: environment.apiUrl + Route.UPLOAD,
    sanitize: false
  };

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

    const value = {
      Id: "",
      text: this.form.value['text'],
      profile_id: profile.id
    }

    this.pending = true;

    try {
      await this.postService.create(value).toPromise();
      this.pending = false;
      this.snackbar.open(SNACKBAR_SUCCESS_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_SUCCESS_CONFIG);
    } catch {
      this.pending = false;
      this.snackbar.open(SNACKBAR_ERROR_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG);
    }
  }

}
