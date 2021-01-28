import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-fielderrors',
  templateUrl: './fielderrors.component.html',
  styleUrls: ['./fielderrors.component.css'],
})
export class FielderrorsComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('form') form: FormGroup;
  // tslint:disable-next-line:no-input-rename
  @Input('field') field: string;
  // tslint:disable-next-line:no-input-rename
  @Input('name') name: string;

  constructor() {}

  ngOnInit(): void {}

  fieldErrors(field: string): ValidationErrors {
    const controlState = this.form.controls[field];
    return controlState.dirty && controlState.errors
      ? controlState.errors
      : null;
  }
}
