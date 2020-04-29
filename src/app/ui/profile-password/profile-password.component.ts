// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenSummary } from 'src/app/api/gen/models';
import { ProfileService } from 'src/app/api/profile.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent extends BaseComponent implements OnInit {
  @Input() model: TokenSummary;
  form: FormGroup;

  constructor(
    private profileSvc: ProfileService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      currentPassword: [''],
      value: ['', [Validators.required, (ctl) => {
        return !ctl.value || ctl.value.match(this.model.complexityRegex)
        ? null
        : { notComplex: true };
      }]],
      confirm: ['']
    }, {validator: this.sameValue });

  }

  sameValue(group: FormGroup) {
    const value = group.get('value').value;
    const confirm = group.get('confirm').value;
    return value === confirm ? null : { notSame: true };
  }

  changePassword() {
    this.startProgress();

    this.subs.push(

      this.profileSvc.postChangedPassword(this.form.value).subscribe(
        () => {
          this.model.hasPassword = true;
          this.form.reset();
        },
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }

}
