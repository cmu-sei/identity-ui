// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component } from '@angular/core';
import { ProfileService } from 'src/app/api/profile.service';
import { TotpResult } from 'src/app/api/gen/models';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.scss']
})
export class TotpComponent extends BaseComponent {

  url = '';
  secret = '';
  code = '';
  result: TotpResult;
  resultText = '';
  variance = '';
  localtime = new Date();

  constructor(
    private profileSvc: ProfileService
  ) {
    super();
  }

  totp() {
    this.subs.push(
      this.profileSvc.getTotpKey().subscribe(
        key => {
          this.url = key;
          this.secret = key.match(/secret=([^&]*)/).pop().replace(/(.{8})/g, '$1 ');

        }
      )
    );
  }

  test() {

    if (!this.code || this.code.length !== 6) {
      return;
    }

    this.subs.push (
      this.profileSvc.testTotpKey(this.code).subscribe(
        (result: TotpResult) => {
          this.result = result;
          this.resultText = `${result.code} was ${result.valid ? 'valid' : 'invalid'}`;
          this.code = '';

          this.localtime = new Date();
          const offset = Math.abs((new Date(result.timestamp).valueOf() - this.localtime.valueOf()) / 1000);

          this.variance = offset > 60
            ? 'Your computer time is more than 60 seconds different than the server. That may cause problems.'
            : '';
        }
      )
    );
  }

}
