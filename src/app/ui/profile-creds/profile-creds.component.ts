// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ProfileService } from 'src/app/api/profile.service';
import { TokenSummary } from 'src/app/api/gen/models';

@Component({
  selector: 'app-profile-creds',
  templateUrl: './profile-creds.component.html',
  styleUrls: ['./profile-creds.component.scss']
})
export class ProfileCredsComponent extends BaseComponent implements OnInit {
  model: TokenSummary;

  constructor(
    private profileSvc: ProfileService
  ) {
    super();

    this.subs.push (

      profileSvc.getTokenSummary().subscribe(
        summary => this.model = summary
      )

    );
  }

  ngOnInit(): void {
  }

  registerCert() {
    this.startProgress();

    this.subs.push(

      this.profileSvc.addCertificate().subscribe(
        () => this.model.certificateCount += 1,
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }

}
