// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/svc/settings.service';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.scss']
})
export class UnauthComponent implements OnInit {

  constructor(
    private config: SettingsService,
  ) {

  }

  ngOnInit(): void {

    const returnUrl = !!this.config.returnUrl
    ? '?returnUrl=' + this.config.returnUrl
    : '';

    const url = this.config.settings.apiUrl + '/account/login' + returnUrl;

    window.open(url, '_self');

  }

}
