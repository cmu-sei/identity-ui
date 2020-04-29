// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPagerComponent } from '../list-pager/list-pager.component';
import { SearchParams, Account } from 'src/app/api/gen/models';
import { Subject, Observable } from 'rxjs';
import { switchMap, tap, last } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { AccountService } from 'src/app/api/account.service';

@Component({
  selector: 'app-account-browser',
  templateUrl: './account-browser.component.html',
  styleUrls: ['./account-browser.component.scss']
})
export class AccountBrowserComponent extends BaseComponent implements OnInit {
  @ViewChild('pager') pagerChild: ListPagerComponent;
  initialPager: SearchParams = { term: '', skip: 0, take: 10, filter: []};
  pager = new Subject<SearchParams>();
  accounts: Observable<Account[]>;
  selected: Account;
  selectedIsNew = false;
  showImport = false;
  showOverride = false;
  count = 0;
  lastActive: HTMLElement;

  constructor(
    private accountSvc: AccountService
  ) {
    super();

    this.accounts = this.pager.pipe(
      switchMap(p => this.accountSvc.list(p)),
      tap(list => list.forEach(a => this.setDisplay(a))),
      tap(results => this.count = results.length)
    );
  }

  ngOnInit(): void {
  }

  fetch(pager: SearchParams) {
    this.pager.next(pager);
  }

  select(resource: Account) {
    this.lastActive = document.activeElement as HTMLElement;
    this.selected = resource;
  }

  clear() {
    this.selected = null;
    this.selectedIsNew = false;
    this.lastActive.focus();
  }

  deleted() {
    this.clear();
    this.pagerChild.refresh();
  }

  setDisplay(account: Account) {
    account.name = account.properties.find(p => p.key === 'name')?.value;
    account.username = account.properties.find(p => p.key === 'username')?.value;
    account.email = account.properties.find(p => p.key === 'email')?.value;
  }
}
