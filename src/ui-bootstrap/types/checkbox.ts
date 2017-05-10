import { Component } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '../../core/core';

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <label *ngIf="!options.viewMode" class="custom-control custom-checkbox">
      <input type="checkbox" [formControl]="formControl"
        *ngIf="!to.hidden" value="on"
        [formlyAttributes]="field" class="custom-control-input">
        {{to.label}}
        <span class="custom-control-indicator"></span>
    </label>
    <span *ngIf="options.viewMode" class="form-control  view-mode">{{formControl.value}}<span>
  `,
})
export class FormlyFieldCheckbox extends FieldType {
  static createControl(model: any, field: FormlyFieldConfig): AbstractControl {
    return new FormControl(
      { value: model ? 'on' : undefined, disabled: field.templateOptions.disabled },
      field.validators ? field.validators.validation : undefined,
      field.asyncValidators ? field.asyncValidators.validation : undefined,
    );
  }
}
