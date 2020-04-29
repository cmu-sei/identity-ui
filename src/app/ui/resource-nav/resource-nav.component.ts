// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-resource-nav',
  templateUrl: './resource-nav.component.html',
  styleUrls: ['./resource-nav.component.scss']
})
export class ResourceNavComponent extends BaseComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
