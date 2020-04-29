// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import * as Croppie from 'croppie/croppie';
import { BaseComponent } from '../../base.component';
@Component({
  selector: 'app-imageuploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent extends BaseComponent {
  @Input() path = '';
  @Output() selected = new EventEmitter<string>();
  @ViewChild('croppieDiv', { static: true }) croppieDiv: ElementRef;
  croppie: any;
  selectedFileList: FileList;
  uploadProgress = 0;
  descriptiveName = '';
  count = 0;
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  initCroppie() {
    if (!this.croppie) {
      this.croppie = new Croppie(this.croppieDiv.nativeElement, {
        viewport: { width: 240, height: 240 },
        boundary: { width: 420, height: 420 },
        customClass: 'image-crop'
      });

      this.croppie.bind({
        url: 'assets/placeholder.png',
      });
    }
  }

  selectorChanged(e) {
    this.selectedFileList = (e.target || e.srcElement).files;
    if (this.selectedFileList && this.selectedFileList.length > 0) {
      const file: File = this.selectedFileList[0];
      // this.descriptiveName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ((event: any) => {
        this.croppie.bind({
          url: event.target.result
        });
      });
    }
  }

  upload(): Promise<any> {
    return this.croppie.result({type: 'blob', size: 'viewport'})
      .then((file: File) => {
        if (file) {
          // this.uploadFile(result);
          const payload: FormData = new FormData();
          payload.append('meta', `size=${file.size}`);
          payload.append('file', file, this.descriptiveName || file.name);
          this.subs.push(
            this.http.request<any>(
              new HttpRequest('POST', this.path, payload, { reportProgress: true })
            ).subscribe(
              (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.uploadProgress = Math.round(100 * event.loaded / event.total);
                } else if (event.type === HttpEventType.Response) {
                  this.selected.emit(event.body.url + '?z=' + this.count++);
                  this.uploadProgress = 100;
                  this.selectedFileList = null;
                  this.croppie.destroy();
                  this.croppie = null;
                }
              }
              // (err) => qf.error = err.error || err,
            )
          );
        }
      });
  }

}
