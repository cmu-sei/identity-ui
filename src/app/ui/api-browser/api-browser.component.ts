// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPagerComponent } from '../list-pager/list-pager.component';
import { Subject, Observable } from 'rxjs';
import { Resource, SearchParams } from 'src/app/api/gen/models';
import { BaseComponent } from '../base.component';
import { switchMap, tap } from 'rxjs/operators';
import { ResourceService } from 'src/app/api/resource.service';

@Component({
  selector: 'app-api-browser',
  templateUrl: './api-browser.component.html',
  styleUrls: ['./api-browser.component.scss']
})
export class ApiBrowserComponent extends BaseComponent implements OnInit {
  @ViewChild('pager') pagerChild: ListPagerComponent;
  initialPager: SearchParams = { term: '', skip: 0, take: 20 , filter: ['api']};
  pager = new Subject<SearchParams>();
  apiResources: Observable<Resource[]>;
  identityResources: Observable<Resource[]>;
  selected: Resource;
  selectedIsNew = false;
  count = 0;

  constructor(
    private resourceSvc: ResourceService
  ) {
    super();

    this.apiResources = this.pager.pipe(
      switchMap(p => this.resourceSvc.list(p)),
      tap(results => this.count = results.length)
    );

    this.identityResources = this.resourceSvc.list({filter: ['identity']});
  }

  ngOnInit(): void {
  }

  fetch(pager: SearchParams) {
    this.pager.next(pager);
  }

  select(resource: Resource) {
    this.selected = resource;
  }

  clear() {
    this.selected = null;
    this.selectedIsNew = false;
  }

  add() {
    this.subs.push(

      this.resourceSvc.create({}).subscribe(
        (summary: Resource) => {
          this.selectedIsNew = true;
          this.select(summary);
          this.pagerChild.push(summary.name);
        }
      )

    );
  }

  updated(resource: Resource) {
    if (
      this.select.name !== resource.name
      || this.selected.displayName !== resource.displayName
    ) {
      if (this.selectedIsNew) {
        this.pagerChild.push(resource.name);
      } else {
        this.pagerChild.refresh();
      }
    }

    this.selected = resource;
  }

  deleted() {
    this.clear();
    this.pagerChild.refresh();
  }
}
