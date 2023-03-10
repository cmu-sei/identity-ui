import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { AccountService } from 'src/app/api/account.service';
import { MailMessage, MailMessageStatus } from 'src/app/api/gen/models';

@Component({
  selector: 'app-account-mailer',
  templateUrl: './account-mailer.component.html',
  styleUrls: ['./account-mailer.component.scss']
})
export class AccountMailerComponent extends BaseComponent implements OnInit {
  @Input() email = '';
  recipient: UntypedFormControl;
  groups: UntypedFormControl;
  cc: UntypedFormControl;
  bcc: UntypedFormControl;
  message: UntypedFormControl;
  subject: UntypedFormControl;
  from: UntypedFormControl;
  responses: MailMessageStatus[] = [];

  constructor(
    private accountSvc: AccountService
  ) {
    super();
    this.recipient = new UntypedFormControl(this.email, Validators.required);
    this.groups = new UntypedFormControl('');
    this.cc = new UntypedFormControl('', Validators.required);
    this.bcc = new UntypedFormControl('', Validators.required);
    this.subject = new UntypedFormControl('', Validators.required);
    this.message = new UntypedFormControl('', Validators.required);
    this.from = new UntypedFormControl('');
  }

  ngOnInit(): void {
  }

  send() {
    this.startProgress();

    const model: MailMessage = {
      to: this.recipient.value?.split(';') || [],
      cc: this.cc.value.split(';'),
      bcc: this.bcc.value.split(';'),
      from: this.from.value,
      subject: this.subject.value,
      body: this.message.value,
      groups: JSON.parse(this.groups.value || '[]')
    };

    this.subs.push(

      this.accountSvc.mail(model).subscribe(
        (result) => {
          this.recipient.reset();
          this.groups.reset();
          this.responses = result;
        },
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }

  status(): void {
    this.subs.push(
      this.accountSvc.verifymail(
        this.responses.filter(r => r.status !== 'success')
      )
      .subscribe(result => this.responses = result)
    );
  }
}
