import { Component } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '../../core/core';


export class SelectOption {
  label: string;
  value?: string;
  group?: SelectOption[];

  constructor(label: string, value?: string, children?: SelectOption[]) {
    this.label = label;
    this.value = value;
    this.group = children;
  }
}


@Component({
  selector: 'formly-field-select',
  template: `
    <select *ngIf="!options.viewMode" [formControl]="formControl" class="form-control" [formlyAttributes]="field">
      <option value="" *ngIf="to.placeholder">{{to.placeholder}}</option>
      <ng-container *ngFor="let item of selectOptions">
       <optgroup *ngIf="item.group" label="{{item.label}}">
         <option *ngFor="let child of item.group" [value]="child.value">
           {{child.label}}
         </option>
       </optgroup>
       <option *ngIf="!item.group" [value]="item.value">{{item.label}}</option>
      </ng-container>
    </select>
    <span *ngIf="options.viewMode" class="form-control  view-mode">{{valueLabel}}<span>
  `,
})
export class FormlyFieldSelect extends FieldType {
  get labelProp(): string { return this.to['labelProp'] || 'label'; }
  get valueProp(): string { return this.to['valueProp'] || 'value'; }
  get groupProp(): string { return this.to['groupProp'] || 'group'; }

  get selectOptions() {
    let options: SelectOption[] = [];
    this.to.options.map((option: SelectOption) => {
      if (!option[this.groupProp]) {
        options.push(option);
      } else {
        let filteredOption: SelectOption[] = options.filter((filteredOption) => {
          return filteredOption.label === option[this.groupProp];
        });
        if (filteredOption[0]) {
          filteredOption[0].group.push({
            label: option[this.labelProp],
            value: option[this.valueProp],
          });
        }
        else {
          options.push({
            label: option[this.groupProp],
            group: [{ value: option[this.valueProp], label: option[this.labelProp] }],
          });
        }
      }
    });
    return options;
  }

  get valueLabel(){
    let label;
    outSideOfLoop:
    for(let option of this.selectOptions){

      if(option.group){
        for(let optionInner of option.group){
          if(optionInner.value === this.formControl.value){
            label= optionInner.label;
            break outSideOfLoop;
          }
        }
      }

      if(option.value === this.formControl.value){
        label= option.label;
        break outSideOfLoop;
      }
    }

    return label;
  }

    static createControl(model: any, field: FormlyFieldConfig): AbstractControl {
    return new FormControl(
        { value: model || '', disabled: field.templateOptions.disabled },
        field.validators ? field.validators.validation : undefined,
        field.asyncValidators ? field.asyncValidators.validation : undefined,
      );
  }
}
