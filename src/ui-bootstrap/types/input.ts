import { Component } from '@angular/core';
import { FieldType } from '../../core/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input *ngIf="!options.viewMode" [type]="type" [formControl]="formControl"  class="form-control"
      [formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}">
    <p *ngIf="options.viewMode" class="form-control-static">{{type !== 'date' ? formControl.value : formControl.value | date }}</p>
    `,
})
export class FormlyFieldInput extends FieldType {
  get type() {
    return this.to.type || 'text';
  }
}
