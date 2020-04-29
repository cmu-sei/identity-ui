// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/api/gen/models';
import { AccountService } from 'src/app/api/account.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent extends BaseComponent implements OnInit {
  @Input() account: Account;
  @Output() deleted = new EventEmitter<Account>();
  newCode = '';

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
}
