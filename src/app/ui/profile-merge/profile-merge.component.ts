// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TokenSummary } from 'src/app/api/gen/models';
import { ProfileService } from 'src/app/api/profile.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-profile-merge',
  templateUrl: './profile-merge.component.html',
  styleUrls: ['./profile-merge.component.scss']
})
export class ProfileMergeComponent extends BaseComponent implements OnInit {
  @Input() model: TokenSummary;
  discardCode = '';
  mergeResult = '';
  mergeForm = new FormControl();

  constructor(
    private profileSvc: ProfileService,
  ) {
    super();
  }

  ngOnInit(): void {

  }

  getMergeCode() {
    this.subs.push(
      this.profileSvc.getMergeCode().subscribe(r => this.discardCode = r.code)
    );
  }

  applyMerge() {
    if (!this.mergeForm.value.trim()) { return; }

    this.subs.push(
      this.profileSvc.postMergeCode(this.mergeForm.value).subscribe(
        () => {
          this.mergeResult = 'Accounts merged.';
          this.mergeForm.reset();
        },
        (err) => this.onError(err)
      )
    );
  }
}
