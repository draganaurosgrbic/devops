import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/models/pagination';
import { ApiService } from 'src/app/services/api.service';
import { ButtonConfig, ListConfig } from 'src/app/utils/list';
import { fieldFormat } from 'src/app/utils/functions';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  @Input() config: ListConfig;
  page: Page<any>;
  subscription: Subscription;
  show_search = true;

  editor_config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    showToolbar: false,
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
    sanitize: false
  };

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => this.read(params));
    this.show_search = this.config.show_search == false ? false : true;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async read(params?: Params) {
    params = params || this.route.snapshot.queryParams;
    const id_params = this.route.snapshot.params;
    this.page = await this.apiService[this.config.serviceName][this.config.methodName]
      (
        params['search'] || '',
        +params['offset'] || 0,
        +params['limit'] || 7,
        id_params['id'] || 0
      ).toPromise();
  }

  handleClick(button: ButtonConfig, item: any) {
    button.click(item).then(() => this.read());
  }

  fields(item: any) {
    return Object.keys(item).filter(
      field => !this.config.hiddenFields?.includes(field) && (typeof item[field] !== 'object' || Array.isArray(item[field]))
        && !this.config.richFields?.includes(field));
  }

  compositeData(item: any) {
    const compositeFields = Object.keys(item).filter(
      field => !this.config.hiddenFields?.includes(field) && typeof item[field] === 'object' && !Array.isArray(item[field])
        && !this.config.richFields?.includes(field))
    let values = {}
    for (const field of compositeFields) {
      values = { ...values, ...item[field] }
    }
    return values
  }

  fieldPreview(field: string) {
    return fieldFormat(field);
  }

  valuePreview(value: any, field?: string) {
    if (typeof value === 'boolean') {
      return value ? 'yes' : 'no';
    } if (Array.isArray(value)) {
      const result = [];
      value.forEach(item => {
        if ('name' in item && 'company' in item && 'start' in item && 'end' in item) {
          result.push(`${item.name} (${item.company}, ${new Date(item.start).toISOString().substring(0, 10)}: ${new Date(item.end).toISOString().substring(0, 10)})`);
        } else if ('name' in item) {
          result.push(item.name);
        }
      });
      return result.length ? result.join(', ') : 'None';
    }
    if (field === 'date') {
      return new Date(value).toISOString().substring(0, 10)
    }
    return value;
  }

  rich_fields(item: any) {
    return Object.keys(item).filter(
      field => !this.config.hiddenFields?.includes(field) && typeof item[field] !== 'object' && this.config.richFields?.includes(field));
  }

}
