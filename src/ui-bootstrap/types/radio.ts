import { Component } from '@angular/core';
import { FieldType } from '../../core/core';

@Component({
  selector: 'formly-field-radio',
  template: `
    <div *ngIf="!options.viewMode" [formGroup]="form">
      <div *ngFor="let option of to.options" class="radio">
        <label class="custom-control custom-radio">
          <input [name]="id" type="radio" [value]="option.value" [formControl]="formControl"
          [formlyAttributes]="field" class="custom-control-input">
          {{option.label}}
        </label>
      </div>
    </div>
    <div *ngIf="options.viewMode" class="form-control view-mode" >{{valueLabel}}</div>
  `,
})
export class FormlyFieldRadio extends FieldType {
  get valueLabel(){
    return this.to.options.
    filter(item => item.value === this.formControl.value)[0].label;
  }
}
