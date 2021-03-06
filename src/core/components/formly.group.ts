import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldType } from '../templates/field.type';
import { clone } from '../utils';

@Component({
  selector: 'formly-group',
  template: `
    <formly-form [ngClass]="this.field.display|| 'display-table' " [style.display]="display" [fields]="field.fieldGroup" [model]="model" [form]="formlyGroup" [options]="newOptions" [ngClass]="field.className" [buildForm]="false"></formly-form>
  `
})
export class FormlyGroup extends FieldType {

  get display(){
    return this.field.display || 'table';
  }
  get newOptions() {
    return clone(this.options);
  }

  get formlyGroup(): AbstractControl {
    if (this.field.formControl) {
      return this.field.formControl;
    } else {
      return this.form;
    }
  }
}
