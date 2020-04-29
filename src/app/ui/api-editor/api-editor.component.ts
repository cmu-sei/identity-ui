// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resource, ResourceTypeEnum } from 'src/app/api/gen/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  form: FormGroup;
  invited = false;
  privileged = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceSvc: ResourceService,
    private formBuilder: FormBuilder,
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
      default: [resource.default],
      enabled: [{ value: resource.enabled, disabled: !this.privileged}],
      type: [ResourceTypeEnum.api],
      managers: [resource.managers]

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

  newInvite() {
    this.subs.push(

      this.resourceSvc.generateInvite(this.resource.id).subscribe(
        (invite) => {
          this.clipboardSvc.copyToClipboard(invite.url);
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
