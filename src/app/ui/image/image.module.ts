// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserComponent } from './browser/browser.component';
import { UploaderComponent } from './uploader/uploader.component';
import { SelectorComponent } from './selector/selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrowserComponent, UploaderComponent, SelectorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SelectorComponent,
    BrowserComponent,
    UploaderComponent
  ]
})
export class ImageModule { }
