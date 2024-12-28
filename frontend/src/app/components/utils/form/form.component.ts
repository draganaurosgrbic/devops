import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { FormService } from 'src/app/services/form.service';
import { FormConfig, FormControlConfig } from 'src/app/utils/form';
import { SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG, SNACKBAR_ERROR_TEXT, SNACKBAR_SUCCESS_CONFIG, SNACKBAR_SUCCESS_TEXT } from 'src/app/utils/popup';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { fieldFormat } from 'src/app/utils/functions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  constructor(
    private formService: FormService,
    private apiService: ApiService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  @Input() config: FormConfig;
  form: FormGroup;
  pending = false;

  ngOnInit() {
    this.form = this.formService.build(this.config);
    if (this.config.initMethodName) {
      this.apiService[this.config.serviceName][this.config.initMethodName]().subscribe(res => this.form.reset(res));
    }
  }

  fieldPreview(field: string) {
    return fieldFormat(field);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    for (const control of this.composite(this.config.controls)) {
      for (const element of control.elements) {
        if (element.validation === 'required'
          && this.form.get(control.name).value.some(item => !item[element.name])) {
          return;
        }
      }
    }
    const value = this.form.value;
    for (const control of this.config.controls) {
      if (control.type === 'date') {
        value[control.name] = new Date(value[control.name]).toISOString().substring(0, 10);
      }
    }
    this.pending = true;
    try {
      await this.apiService[this.config.serviceName][this.config.methodName](value).toPromise();
      this.pending = false;
      this.snackbar.open(SNACKBAR_SUCCESS_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_SUCCESS_CONFIG);
      if (this.config.backUrl) {
        this.router.navigate([this.config.backUrl]);
      }
    } catch {
      this.pending = false;
      this.snackbar.open(SNACKBAR_ERROR_TEXT, SNACKBAR_CLOSE_BUTTON, SNACKBAR_ERROR_CONFIG);
    }
  }

  addElement(control: FormControlConfig) {
    const newElement = {};
    for (const element of control.elements) {
      newElement[element.name] = '';
    }
    this.form.get(control.name).setValue(this.form.get(control.name).value.concat(newElement));
  }

  removeElement(control: FormControlConfig, index: number) {
    const value = this.form.get(control.name).value;
    value.splice(index, 1);
    this.form.get(control.name).setValue(value);
  }

  updateElement(control: FormControlConfig, index: number, field: string, value: string | MatDatepickerInputEvent<any>) {
    const formValue = this.form.get(control.name).value;
    formValue.splice(index, 1, { ...formValue[index], [field]: typeof value === 'string' ? value : value.target.value.toISOString().substring(0, 10) });
    this.form.get(control.name).setValue(formValue);
  }

  simple(controls: FormControlConfig[]) {
    return controls.filter(control => control.type !== 'composite');
  }

  composite(controls: FormControlConfig[]) {
    return controls.filter(control => control.type === 'composite');
  }

}
