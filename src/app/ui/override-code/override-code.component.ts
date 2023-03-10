// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit } from '@angular/core';
import { OverrideService } from 'src/app/api/override.service';
import { BaseComponent } from '../base.component';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { OverrideCode } from 'src/app/api/gen/models';

@Component({
  selector: 'app-override-code',
  templateUrl: './override-code.component.html',
  styleUrls: ['./override-code.component.scss']
})
export class OverrideCodeComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;
  codes: OverrideCode[] = [];

  constructor(
    private codesSvc: OverrideService,
    private formBuilder: UntypedFormBuilder
  ) {
    super();

    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      description: ['']
    });

    this.subs.push(

      codesSvc.list().subscribe(
        (list) => {
          this.codes = list;
        },
        (err) => this.errors.push(err)
      )

    );
  }

  ngOnInit(): void {
  }

  add() {
    this.subs.push(

      this.codesSvc.create({
        code: this.form.value.code,
        description: this.form.value.description
      }).subscribe(code => {
        this.codes.push(code);
        this.form.reset();
      }, (err) => this.errors.push(err))

    );
  }

  remove(item: OverrideCode) {
    this.subs.push(

      this.codesSvc.delete(item.id).subscribe(
        () => {
          this.codes = this.codes.filter(c => c.id !== item.id);
        },
        (err) => this.errors.push(err)
      )

    );
  }
}
