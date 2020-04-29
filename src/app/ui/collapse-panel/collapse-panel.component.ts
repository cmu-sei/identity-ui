// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss']
})
export class CollapsePanelComponent implements OnInit {
  @Input() label = '';
  @Input() visible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.visible = !this.visible;
  }
}
