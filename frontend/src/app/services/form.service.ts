import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormConfig, FormControlValidation } from '../utils/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private builder: FormBuilder) { }

  build(config: FormConfig) {
    const data = {};
    for (const control of config.controls) {
      data[control.name] = ['', this.buildValidation(control.validation)];
    }
    return this.builder.group(data);
  }

  private buildValidation(config: FormControlValidation) {
    if (config === 'required') {
      return [Validators.required, Validators.pattern(new RegExp('\\S'))];
    }
    return undefined;
  }
}
