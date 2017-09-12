import { Component } from '@angular/core';
import { FieldType } from '../../core/core';

@Component({
  selector: 'formly-field-textarea',
  template: `
    <textarea *ngIf="!options.viewMode" [name]="key" [formControl]="formControl" [cols]="to.cols"
      [rows]="to.rows" class="form-control"
      [formlyAttributes]="field">
    </textarea>
    <p *ngIf="options.viewMode" class="form-control-static ">{{formControl.value}}</p>
  `,
})
export class FormlyFieldTextArea extends FieldType {
}
