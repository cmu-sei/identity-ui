// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxlength = 100;
  @Input() field = '';
  @Input() control: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

}
