// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/api/gen/models';
import { AccountService } from 'src/app/api/account.service';
import { BaseComponent } from '../base.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent extends BaseComponent implements OnInit {
  @Input() account: Account;
  @Output() deleted = new EventEmitter<Account>();
  newCode = '';
  email = '';
  emailVisible = false;
  emailError = '';

  constructor(
    private accountSvc: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  delete(confirmed: boolean) {

    if (!confirmed) { return; }

    // this.subs.push(

    //   this.accountSvc.delete(this.account.id).subscribe(
    //     () => {
    //       this.deleted.emit(this.account);
    //     }
    //   )

    // );
  }

  unlock() {

    this.subs.push(

      this.accountSvc.unlock(this.account.id).subscribe(
        () => {
          this.account.lockedSeconds = 0;
        }
      )

    );
  }

  role() {

    const target = (this.account.role === 'Member')
      ? 'Manager'
      : 'Member';

    this.subs.push(

      this.accountSvc.role(this.account.id, target).subscribe(
        () => {
          this.account.role = target;
        }
      )

    );
  }

  state() {

    const target = (this.account.status === 'Disabled')
      ? 'Enabled'
      : 'Disabled';

    this.subs.push(

      this.accountSvc.state(this.account.id, target).subscribe(
        () => {
          this.account.status = target;
        }
      )

    );
  }

  code() {

    this.subs.push (

      this.accountSvc.code(this.account.id).subscribe(
        (result) => {
          this.newCode = result.code;
        }
      )

    );
  }

  addEmail() {
    if (this.email) {
      // send
      this.accountSvc.addtoken(this.account.globalId, this.email).subscribe(
        () => {
          this.account.properties.push({key: 'email', value: this.email });
          this.email = '';
          this.emailError = '';
          this.emailVisible = false;
        },
        (err) => {
          this.emailError = err.error.message || err.message;
        }
      );
    } else {
      this.emailVisible = !this.emailVisible;
    }

  }
}
