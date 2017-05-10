import { Component } from '@angular/core';
import { FieldType } from '../../core/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input *ngIf="!options.viewMode" [type]="type" [formControl]="formControl" class="form-control"
      [formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}">
    <span *ngIf="options.viewMode" class="form-control view-mode">{{formControl.value}}<span>
    `,
})
export class FormlyFieldInput extends FieldType {
  get type() {
    return this.to.type || 'text';
  }
}
