// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss']
})
export class InputListComponent implements OnInit {
  @Input() label = '';
  @Input() field = '';
  @Input() placeholder = '';
  @Input() maxlength = 100;
  @Input() control: AbstractControl;
  items: Array<ListItem> = [];
  input = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.control.value.push(
      { value: this.input.value }
    );
    this.control.markAsDirty();
    this.input.reset();
  }

  removeItem(item: ListItem) {
    item.deleted = !item.deleted;
    this.control.markAsDirty();
  }
}

export interface ListItem {
  id?: string | number;
  value?: string;
  deleted?: boolean;
}
