// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imageselector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnChanges {
  @Input() path = '';
  @Input() browseable = false;
  @Output() selected = new EventEmitter<string>();
  browsing = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.browsing = this.browseable;
  }

  onSelected(url: string) {
    this.selected.emit(url);
  }
}
