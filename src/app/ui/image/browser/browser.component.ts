// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-imagebrowser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent extends BaseComponent implements OnChanges {
  @Input() path = '';
  @Output() selected = new EventEmitter<string>();

  term = '';
  skip = 0;
  take = 8;
  hasMore = false;
  urlList = new Array<string>();
  termsub = new Subject<string>();
  term$ = this.termsub.asObservable()
    .pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

  constructor(
    private http: HttpClient
  ) {
    super();
    this.subs.push(
      this.term$.subscribe(term => this.search(term))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.path) {
      const cur = (changes.path.currentValue + '');
      const pre = changes.path.previousValue + '';
      if (cur.substring(0, cur.lastIndexOf('/')) !== pre.substring(0, pre.lastIndexOf('/'))) {
        this.search('');
      }
    }
  }

  termChanged(term: string) {
    this.termsub.next(term);
  }

  search(term: string) {
    this.skip = 0;
    this.term = term;
    this.fetch();
  }

  next() {
    this.fetch();
  }

  prev() {
    this.skip = Math.max(0, this.skip - (2 * this.take));
    this.fetch();
  }

  fetch() {
    const qs = `?q=${this.term}&s=${this.skip}&t=${this.take}`;

    this.subs.push(
      this.http.get<Array<string>>(this.path.split('?').shift() + qs).subscribe(
        list => {
          if (list.length > 0) {
            this.urlList = list;
          }
          this.hasMore = list.length === this.take;
          this.skip += list.length;
        }
      )
    );
  }

  select(url: string) {
    this.selected.emit(url);
  }
}
