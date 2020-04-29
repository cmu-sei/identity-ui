// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component } from '@angular/core';
import { ProfileService } from 'src/app/api/profile.service';
import { AccountProfile } from 'src/app/api/gen/models';
import { SettingsService } from 'src/app/svc/settings.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent {

  profile: AccountProfile;
  showEdit = false;
  showTotp = false;
  showCreds = false;
  showImageEdit = false;
  uploadTarget = '';
  formValid = true;

  constructor(
    private profileSvc: ProfileService,
    private settingsSvc: SettingsService
  ) {
    super();

    this.subs.push(
      this.profileSvc.load('').subscribe(
        (profile: AccountProfile) => {
          this.profile = profile;
        }
      )
    );
  }

  imageSelected(url: string) {
    const folder = this.extractFolder(url);
    const folderOptions = this.settingsSvc.settings.imageFolders.find(f => f.folder === folder);
    switch (folderOptions.field) {
      case 'avatar':
        this.profile.avatar = url;
        break;
      case 'organizationLogo':
        this.profile.orgLogo = url;
        break;
      case 'organizationUnitLogo':
        this.profile.unitLogo = url;
        break;
    }
    this.uploadTarget = url;
    this.save();
    this.clear();
  }

  extractFolder(url: string): string {
    return url.substring(0, url.lastIndexOf('/')).split('/').pop();
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
    this.uploadTarget = url;
    this.showEdit = false;
    this.showImageEdit = true;
  }

  clear() {
    this.showEdit = this.showImageEdit;
    this.showImageEdit = false;
    this.showTotp = false;
    this.showCreds = false;

    const mainHeader = document.querySelector('#main') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}
