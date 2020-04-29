// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsernameRegistration } from '../../api/gen/models';
import { BaseComponent } from '../base.component';
import { AccountService } from 'src/app/api/account.service';

@Component({
  selector: 'app-account-import',
  templateUrl: './account-import.component.html',
  styleUrls: ['./account-import.component.scss']
})
export class AccountImportComponent extends BaseComponent implements OnInit {
  input: FormControl;
  passwd: FormControl;
  results: UsernameRegistration[];

  constructor(
    private accountSvc: AccountService
  ) {
    super();
    this.input = new FormControl('', Validators.required);
    this.passwd = new FormControl('');
  }

  ngOnInit(): void {
  }

  import() {
    if (this.input.value) {
      this.startProgress();

      this.subs.push(

        this.accountSvc.import({
          usernames: this.input.value.split('\n'),
          password: this.passwd.value
        }).subscribe(results => {
          this.results = results;
          this.input.reset();
        },
        (err) => this.onError(err),
        () => this.endProgress(true))

      );
    }
  }
}
