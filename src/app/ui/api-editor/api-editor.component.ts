// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resource, ResourceTypeEnum, ApiSecret } from 'src/app/api/gen/models';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { ResourceService } from 'src/app/api/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'src/app/svc/clipboard.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { SettingsService } from 'src/app/svc/settings.service';

@Component({
  selector: 'app-api-editor',
  templateUrl: './api-editor.component.html',
  styleUrls: ['./api-editor.component.scss']
})
export class ApiEditorComponent extends BaseComponent implements OnInit {
  @Input() id: number;
  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter<Resource>();
  resource: Resource;
  form: UntypedFormGroup;
  invited = false;
  privileged = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceSvc: ResourceService,
    private formBuilder: UntypedFormBuilder,
    private clipboardSvc: ClipboardService,
    private config: SettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    const q = (this.id)
      ? of(this.id)
      : this.route.paramMap.pipe(
        map(p => +p.get('id'))
      );

    this.privileged = this.config.isPrivilegedUser();

    this.subs.push(
      q.pipe(
        switchMap(id => this.resourceSvc.load(id))
      ).subscribe(resource => {
        this.clientToForm(resource);
        this.resource = resource;
      })
    );
  }

  clientToForm(resource: Resource) {

    this.form = this.formBuilder.group({

      id: [resource.id],
      name: [resource.name, Validators.required],
      displayName: [resource.displayName],
      scopes: [resource.scopes],
      userClaims: [resource.userClaims],
      default: [resource.default],
      enabled: [{ value: resource.enabled, disabled: !this.privileged}],
      type: [ResourceTypeEnum.api],
      managers: [resource.managers],
      secrets: [ resource.secrets ]
    });
  }

  save() {

    this.subs.push(

      this.resourceSvc.update(this.form.value).pipe(
        catchError(err => { throw err; })
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.form.reset(resource);
          this.updated.emit(this.resource);
        },
        (err) => this.errors.push(err)
      )

    );

  }

  newSecret() {
    this.subs.push(
      this.resourceSvc.generateSecret(this.resource.id).subscribe(
        (secret: ApiSecret) => {
          this.form.controls.secrets.value.push(secret);
        }
      )
    );
  }

  newInvite() {
    this.subs.push(

      this.resourceSvc.generateInvite(this.resource.id).subscribe(
        (invite) => {
          const url = `${this.config.selfUrl()}resource/enlist/${invite.code}`;
          this.clipboardSvc.copyToClipboard(url);
          this.invited = true;
          this.subs.push(
            timer(4000).subscribe(() => this.invited = false)
          );
        }
      )

    );
  }

  delete(confirmed: boolean) {

    if (!confirmed) { return; }

    this.subs.push(

      this.resourceSvc.delete(this.resource.id).subscribe(
        () => {
          this.deleted.emit();
          this.subs.push(
            timer(200).subscribe(() => this.router.navigate(['..']))
          );
        }
      )

    );
  }
}
