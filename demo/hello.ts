// polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { NgModule, Component, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule, FormlyFieldConfig, FormlyBootstrapModule, ConfigOption } from './../src/index';
import { ValidationService } from './validation.service';
import { RepeatComponent } from './repeatedSection';
import { FormlyFieldToggle } from './toggle';
import { FormlyWrapperHorizontalLabel } from './horizontal.wrapper';
import { FormlyPanelWrapper } from './panel.wrapper';
import { SuperHerosService } from './super-heros';
import { tdWrapperComponent } from './tdWrapper';


@Component({
  selector: 'formly-demo-hello-app',
  templateUrl: './template.html',
  styles:[`
      /deep/ .border-left-line{
          border-right:1px solid #ddd;
      }

      /deep/ formly-field{
          display:table-row
      }

      /deep/ formly-field td{
          padding: 5px;
      }

      /deep/ formly-field .form-group{
          margin-bottom:0
      }

      /deep/ formly-form{
          display:table;
          width:100%
      }

      /deep/ formly-form.table-row > formly-field{
          display:table-cell !important 
      }

      /deep/ formly-group{
        display:table;
        width:100%;
      }
      
      /deep/ .view-mode{
        border:0px;
      }
      /deep/ .custom-control-input{
        position: relative;
        display: inline;
        opacity: 1;
        z-index:1;
      }

      /deep/ .custom-control{
        padding-left:0;
      }
  `]
})
export class HelloApp {
  form: FormGroup;
  author;
  env;
  _user;
  user: any = {};
  options;
  userFields: Array<FormlyFieldConfig> = [];

  constructor(fb: FormBuilder, private sh: SuperHerosService) {
    this.form = fb.group({});

    this.author = {
      name: 'Mohammed Zama Khan',
      url: 'https://www.github.com/mohammedzamakhan',
    };
    this.env = {
      angularVersion: '2.1.1',
      formlyVersion: '1.0.0-rc.2',
    };

    let userFields: Array<FormlyFieldConfig> = [
          {
            className: 'col-md-6',
            key: 'email',
            type: 'input',
            templateOptions: {
              type: 'email',
              label: 'Email address',
              placeholder: 'Enter email',
            },
            validators: {
              validation: Validators.compose([Validators.required, ValidationService.emailValidator]),
            },
          }, 
          // {
          //   className: 'col-md-6',
          //   id: 'username',
          //   key: 'username',
          //   type: 'input',
          //   templateOptions: {
          //     label: 'Username',
          //     placeholder: 'Username',
          //     description: 'Existing username: john, tom, paul',
          //     required: true,
          //   },
          //   validation: {
          //     show: true,
          //   },
          //   validators: {
          //     validation: Validators.maxLength(8),
          //     custom: (control: FormControl) => control.value !== 'tom',
          //   },
          //   asyncValidators: {
          //     validation: (control: FormControl) =>
          //     new Promise(resolve => resolve( control.value !== 'john' ? null : { uniqueUsername: true })),
          //     uniqueUserName: (control: FormControl) => new Promise(resolve => resolve( control.value !== 'paul')),
          //   },
          // },
          // {
          //   type: 'multicheckbox',
          //   key: 'interest',
            
          //   templateOptions: {
          //     options: [{
          //       key: 'sports',
          //       value: 'Sports',
          //     }, {
          //       key: 'movies',
          //       value: 'Movies',
          //     }, {
          //       key: 'others',
          //       value: 'Others',
          //     }],
          //     label: 'Interest',
          //     description: 'Select areas which you are interested',
          //   }
          // },
          // {
          //   type: 'radio',
          //   key: 'title1',
          //   templateOptions: {
          //     options: [{
          //       label: 'Mr.',
          //       value: 'mr',
          //     }, {
          //       label: 'Mrs',
          //       value: 'mrs',
          //     }],
          //     label: 'Title 1',
          //     description: 'Select a title that suits your description',
          //     }
          //   },
          // {
          //   className: 'col-md-4',
          //   key: 'select',
          //   type: 'select',
          //   templateOptions: {
          //     options: [{
          //       label: 'Male',
          //       value: 'male',
          //     }, {
          //       label: 'Female',
          //       value: 'female',
          //     }],
          //     label: 'Gender',
          //     placeholder: 'Select Gender',
          //   },
          // }, 
          // {
          //   className: 'col-md-4',
          //   key: 'selectSuperHero',
          //   type: 'select',
          //   templateOptions: {
          //     options: [],
          //     label: 'Gender',
          //     labelProp: 'name',
          //     groupProp: 'gender',
          //     placeholder: 'Select Gender',
          //   },
          //   lifecycle: {
          //     onInit: (form, field) => {
          //       field.templateOptions.options = this.sh.get();
          //     },
          //   },
          // }, 
          // {
          //   key:'x',
          //   type:'checkbox',
          //   templateOptions:{
          //     label:'X'
          //   }
          // },
          // {
          //   key: 'checked',
          //   type: 'checkbox',
          //   templateOptions: {
          //     label: 'Check me out',
          //     description: 'If you want to check me out, check this box',
          //   },
          // },
          // {
          //   key: 'textAreaVal',
          //   type: 'textarea',
          //   modelOptions: {
          //     debounce: {
          //       default: 2000,
          //       blur: 0,
          //     },
          //     updateOn: 'default blur',
          //   },
          //   focus: true,
          //   templateOptions: {
          //     rows: 5,
          //     cols: 20,
          //     label: 'Message',
          //     description: 'Please enter atleast 150 characters',
          //   },
          // }
          
           
        


    ];

    setTimeout(() => this.userFields = userFields);
    this.user = {
      email: 'email@gmail.com',
      // checked: true,
      x:true,
      username:'eisa',
      // select: 'male',
      selectSuperHero: 'captain_america',
      title1: 'mr',
      // title2: 'mrs',
      // toggleVal: true,
      // address: {
      //   street: '604 Causley Eve',
      // },
      interest: {
        movies: false,
        sports: false,
        others: true,
      },
      // hobbies: {
      //   movies: true,
      //   sports: false,
      //   languages: true,
      // },
      // investments: [
      //   {
      //     investmentName: 'Formly',
      //     investmentDate: '02-11-2001',
      //     stockIdentifier: 'FO',
      //   }, {
      //     investmentName: 'Formly Website',
      //     investmentDate: '02-11-2001',
      //     stockIdentifier: 'FW',
      //   },
      // ],
    };


    this.options = {
      formState: {
        readOnly: false,
      },
       viewMode:false
    };

  }

  console(data) {
    console.log(data);
  }

  showEmail() {
    this.form.get('email').setValue('mohammedzamakhan');
    this.form.get('checked').setValue(!this.user.checked);
  }

  hide() {
    this.userFields[1].fieldGroup[0].hideExpression = !this.userFields[1].fieldGroup[0].hideExpression;
  }

  changeEmail(value) {
    this.user = Object.assign({}, this.user, { email: value });
  }

  toggleReadOnly(value) {
    this.options.formState.readOnly = value;
  }
  toggleViewMode(value) {
    //this.options.viewMode = value;
    this.options.viewMode = true;
    alert('ok')
  }

  resetForm() {
    this.form.reset({
      email: 'email@gmail.com',
      checked: true,
      select: 'male',
      title1: 'mr',
      title2: 'mrs',
      toggleVal: true,
      interest: {
        movies: false,
        sports: false,
        others: true,
      },
    });
  }

  resetModelWithModel() {
    this.options.resetModel({
      checked: true,
      title1: 'mrs',
      toggleVal: false,
      interest: {
        sports: true,
      },
      investments: [
        {
          investmentName: 'Formly',
          investmentDate: '02-11-2001',
          stockIdentifier: 'FO',
        }, {
          investmentName: 'Formly Website',
          investmentDate: '02-11-2001',
          stockIdentifier: 'FW',
        }, {
          investmentName: 'Alphabet',
          investmentDate: '12-02-2016',
          stockIdentifier: 'GOOGL',
        },
      ],
      nested: {
        property: {
          magic: 'look what I can do',
        },
        arrays: {
          0: 'why not?',
        },
      },
      unbound: 'not bound in formly',
    });
  }

  submit(user) {
    console.log(user);
  }
}

export const NgFormlyConfig: ConfigOption = {
  types: [
    { name: 'toggle', component: FormlyFieldToggle, defaultOptions: { templateOptions: { isAlert: false, isLarge: true }}},
    { name: 'horizontalInput', extends: 'input'},
    { name: 'repeatSection', component: RepeatComponent },
    { name: 'dateFormat', defaultOptions: { templateOptions: {
      placeholder: 'dd/mm/yyyy such as 20/05/2015',
      dateFormat: 'DD, d  MM, yy',
      addonLeft: {
        class: 'fa fa-usd',
      },
    },
    validators: {
      date: control => !control.value || control.value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) },
    },
  }],
  validators: [{ name: 'required', validation: Validators.required}],
  validationMessages: [
    { name: 'required', message: (err, field) => `${field.templateOptions.label} is required.`},
    { name: 'invalidEmailAddress', message: 'Invalid Email Address' },
    { name: 'maxlength', message: 'Maximum Length Exceeded.' },
    { name: 'minlength', message: (err) => {
        return `Should have atleast ${err.requiredLength} Characters`;
      },
    },
    { name: 'not_matching', message: 'Password Not Matching' },
    { name: 'zipCode', message: 'ZIP code should be 5 characters'},
    { name: 'uniqueUsername', message: 'This username is already taken.'},
  ],
  wrappers: [
    { name: 'formly-wrapper-horizontal', component: FormlyWrapperHorizontalLabel, types: ['horizontalInput'] },
    { name: 'panel', component: FormlyPanelWrapper },
    { name: 'td', component: tdWrapperComponent}
  ],
};

@NgModule({
  declarations: [
    HelloApp, FormlyFieldToggle, FormlyWrapperHorizontalLabel, RepeatComponent, FormlyPanelWrapper,tdWrapperComponent
  ],
  providers: [SuperHerosService],
  imports: [
    BrowserModule,
    FormlyModule.forRoot(NgFormlyConfig),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[tdWrapperComponent],
  bootstrap: [HelloApp],
})
export class FormlyDemoModule {
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(FormlyDemoModule);
