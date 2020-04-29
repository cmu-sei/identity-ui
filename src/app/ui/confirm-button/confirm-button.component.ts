// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss']
})
export class ConfirmButtonComponent implements OnInit {

  @Input() name: string;
  @Input() classlist: string;
  @Input() disabled: boolean;
  @Output() value = new EventEmitter<boolean>();
  active = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.active = !this.active;
  }

  clicked(val: boolean): void {
    this.value.emit(val);
    this.active = false;
  }
}
