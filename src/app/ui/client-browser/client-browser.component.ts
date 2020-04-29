// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientSummary, SearchParams } from 'src/app/api/gen/models';
import { ClientService } from 'src/app/api/client.service';
import { ListPagerComponent } from '../list-pager/list-pager.component';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-client-browser',
  templateUrl: './client-browser.component.html',
  styleUrls: ['./client-browser.component.scss']
})
export class ClientBrowserComponent extends BaseComponent implements OnInit {
  @ViewChild('pager') pagerChild: ListPagerComponent;
  initialPager: SearchParams = { term: '', skip: 0, take: 20 };
  pager = new Subject<SearchParams>();
  clients: Observable<ClientSummary[]>;
  selected: ClientSummary;
  selectedIsNew = false;
  count = 0;

  constructor(
    private clientSvc: ClientService
  ) {
    super();

    this.clients = this.pager.pipe(
      switchMap(p => this.clientSvc.list(p)),
      tap(results => this.count = results.length)
    );
  }

  ngOnInit(): void {
  }

  fetch(pager: SearchParams) {
    this.pager.next(pager);
  }

  select(client: ClientSummary) {
    this.selected = client;
  }

  clear() {
    this.selected = null;
    this.selectedIsNew = false;
  }

  add() {
    this.subs.push(

      this.clientSvc.create({}).subscribe(
        (summary: ClientSummary) => {
          this.selectedIsNew = true;
          this.select(summary);
          this.pagerChild.push(summary.name);
        }
      )

    );
  }

  updated(client: ClientSummary) {
    if (
      this.select.name !== client.name
      || this.selected.displayName !== client.displayName
    ) {
      if (this.selectedIsNew) {
        this.pagerChild.push(client.name);
      } else {
        this.pagerChild.refresh();
      }
    }

    this.selected = client;
  }

  deleted() {
    this.clear();
    this.pagerChild.refresh();
  }
}
