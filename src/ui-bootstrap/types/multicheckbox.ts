import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '../../core/core';

@Component({
  selector: 'formly-field-multicheckbox',
  template: `
    <div *ngFor="let option of to.options" class="checkbox">
        <label class="custom-control custom-checkbox">
            <input type="checkbox" [value]="option.value" [formControl]="formControl.get(option.key)"
            [attr.disabled]="options.viewMode" [formlyAttributes]="field" class="custom-control-input">
            {{option.value}}
        </label>
    </div>
  `,
})
export class FormlyFieldMultiCheckbox extends FieldType {
  static createControl(model: any, field: FormlyFieldConfig): AbstractControl {
    let controlGroupConfig = field.templateOptions.options.reduce((previous, option) => {
      previous[option.key] = new FormControl(model ? model[option.key] : undefined);
      return previous;
    }, {});

    return new FormGroup(controlGroupConfig);
  }
}
