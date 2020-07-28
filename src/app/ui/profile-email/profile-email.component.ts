// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenSummary } from 'src/app/api/gen/models';
import { ProfileService } from 'src/app/api/profile.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.scss']
})
export class ProfileEmailComponent extends BaseComponent implements OnInit {
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
      username: ['', [Validators.required, Validators.email, ctx => this.validDomain(ctx, this.model)]],
      code: ['', Validators.required]
    });

  }

  getVerifyCode() {

    this.startProgress();

    this.subs.push(

      this.profileSvc.sendCode(this.form.value).subscribe(
        () => {},
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }

  addCreds() {
    this.startProgress();
    this.subs.push(

      this.profileSvc.addCredential(this.form.value).subscribe(
        () => {
          if (this.model.allowMultipleCredentials) {
            this.model.emails.push(this.form.value.username);
            this.model.credentialCount += 1;
          } else {
            this.model.emails = [this.form.value.username];
          }

          this.form.reset();
        },
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }

  validDomain(ctx: any, model: TokenSummary): any {

    if (!ctx.value || model.certificateCount > 0 || !model.allowedDomains) {
      return null;
    }

    const list = model.allowedDomains.split(/[ ,|]/)
      .map(x => x.startsWith('.') ? x.substring(1) : x);

    const domain = (ctx.value as string).split('@').pop().split('.');

    while (domain && domain.length > 0) {
      if (list.find(x => x === domain.join('.'))) {
        return null;
      }
      domain.shift();
    }

    return { domain: true };
  }
}
