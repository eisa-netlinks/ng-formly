import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '../../core/core';

@Component({
  selector: 'formly-wrapper-description',
  template: `
  <div  class="form-group clearfix">
    <label *ngIf="!field.section && field.key && field.type" [attr.for]="id" class="control-label" 
    [ngClass]="options.viewMode?field.templateOptions.labelClassView:field.templateOptions.labelClass">
      {{field.templateOptions.label}}<ng-container *ngIf="options.viewMode">:</ng-container>      
    </label>    
    <div [ngClass]="options.viewMode?field.templateOptions.controlClassView:field.templateOptions.controlClass" >
      <ng-container #fieldComponent></ng-container>
    </div>
  </div>
  `,
})
export class Bootstrapper extends FieldWrapper {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}