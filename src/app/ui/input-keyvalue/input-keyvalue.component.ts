// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-keyvalue',
  templateUrl: './input-keyvalue.component.html',
  styleUrls: ['./input-keyvalue.component.scss']
})
export class InputKeyValueComponent implements OnInit {
  @Input() label = '';
  @Input() field = '';
  @Input() keyplaceholder = 'Key';
  @Input() valueplaceholder = 'Value';
  @Input() maxlength = 100;
  @Input() control: AbstractControl;
  keyfield = '';
  valuefield = '';
  items: Array<ListPair> = [];
  keyinput = new FormControl('');
  valueinput = new FormControl('');
  
  constructor() { 
  }

  ngOnInit(): void {
    this.keyfield = this.field+'Key';
    this.valuefield = this.field+'Value';
  }

  getPair(item: ListPair): string {
    return `${item.type?.trim()} = ${item.value?.trim()}`;
  }

  addPair() {
    this.control.value.push(
      { 
        type: this.keyinput.value,
        value: this.valueinput.value
      }
    );
    this.control.markAsDirty();
    this.keyinput.reset();
    this.valueinput.reset();
  }

  removePair(item: ListPair) {
    item.deleted = !item.deleted;
    this.control.markAsDirty();
  }

}

export interface ListPair {
  id?: string | number;
  type?: string; // IdentityServer uses 'Type' as 'Key'
  value?: string;
  deleted?: boolean;
}
