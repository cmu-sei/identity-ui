// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {
  @Input() errors: Array<HttpErrorResponse> = [];

  constructor() { }

  ngOnInit(): void {
  }

  close(err) {
    this.errors.splice(
      this.errors.indexOf(err),
      1
    );
  }
}
