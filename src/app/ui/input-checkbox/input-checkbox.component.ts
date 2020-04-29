// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent implements OnInit {
  @Input() label = '';
  @Input() field = '';
  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

}
