// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountProfile } from 'src/app/api/gen/models';
import { BaseComponent } from '../base.component';
import { ProfileService } from 'src/app/api/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends BaseComponent implements OnInit {
  @Input() profile: AccountProfile;
  @Output() imageRequest = new EventEmitter<string>();
  uploadTarget = '';
  formValid = true;

  constructor(
    private profileSvc: ProfileService
  ) {
    super();
   }

  ngOnInit(): void {
  }

  save() {
    this.formValid = !!this.profile.name;
    if (!this.formValid) {
      return;
    }

    this.subs.push(
      this.profileSvc.update(this.profile).subscribe()
    );
  }

  changeImage(url: string) {
    this.imageRequest.emit(url);
  }
}
