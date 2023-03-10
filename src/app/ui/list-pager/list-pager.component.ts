// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { UntypedFormControl } from '@angular/forms';
import { SearchParams } from 'src/app/api/gen/models';

@Component({
  selector: 'app-list-pager',
  templateUrl: './list-pager.component.html',
  styleUrls: ['./list-pager.component.scss']
})
export class ListPagerComponent extends BaseComponent implements OnInit {
  @Input() search: SearchParams;
  @Input() count: number;
  @Output() changed = new EventEmitter<SearchParams>();

  term = new UntypedFormControl('');

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.subs.push(

      this.term.valueChanges.pipe(
        startWith<string>(this.search.term),
        debounceTime(250),
        map(t => t.trim()),
        distinctUntilChanged()
      ).subscribe(term => {
        this.search.term = term;
        this.search.skip = 0;
        this.changed.next(this.search);
      })

    );
  }

  back() {
    this.search.skip = Math.max(0, this.search.skip - this.search.take);
    this.changed.next(this.search);
  }

  next() {
    this.search.skip += this.search.take;
    this.changed.next(this.search);
  }

  clear() {
    this.term.setValue('');
  }

  push(term: string) {
    this.term.setValue(term);
  }

  refresh() {
    this.changed.next(this.search);
  }
}
