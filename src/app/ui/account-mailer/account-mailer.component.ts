import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../base.component';
import { AccountService } from 'src/app/api/account.service';
import { MailMessage } from 'src/app/api/gen/models';

@Component({
  selector: 'app-account-mailer',
  templateUrl: './account-mailer.component.html',
  styleUrls: ['./account-mailer.component.scss']
})
export class AccountMailerComponent extends BaseComponent implements OnInit {
  @Input() email = '';
  recipient: FormControl;
  cc: FormControl;
  bcc: FormControl;
  message: FormControl;
  subject: FormControl;
  from: FormControl;

  constructor(
    private accountSvc: AccountService
  ) {
    super();
    this.recipient = new FormControl(this.email, Validators.required);
    this.cc = new FormControl('', Validators.required);
    this.bcc = new FormControl('', Validators.required);
    this.subject = new FormControl('', Validators.required);
    this.message = new FormControl('', Validators.required);
    this.from = new FormControl('');
  }

  ngOnInit(): void {
  }

  send() {
    this.startProgress();

    const model: MailMessage = {
      to: this.recipient.value.split(';'),
      cc: this.cc.value.split(';'),
      bcc: this.bcc.value.split(';'),
      from: this.from.value,
      subject: this.subject.value,
      body: this.message.value
    };

    const query = model.to[0].startsWith('@')
      ? this.accountSvc.mailbatch(model)
      : this.accountSvc.mail(model);

    this.subs.push(

      query.subscribe(
        () => this.recipient.reset(),
        (err) => this.onError(err),
        () => this.endProgress(true)
      )

    );
  }
}
