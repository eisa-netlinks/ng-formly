import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from '../src/core/templates/field.wrapper';
@Component({
  selector: 'formly-td',
  template: `
  <td>
    <ng-container #fieldComponent></ng-container>
  </td>
  `,
})
export class tdWrapperComponent extends FieldWrapper{
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}