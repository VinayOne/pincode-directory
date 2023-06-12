import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  mailSent = false;
  
  feedbackForm = new FormGroup({
    visitorName: new FormControl('', Validators.required),
    visitorEmail: new FormControl('', [Validators.required, Validators.email]),
    visitorText: new FormControl('', Validators.required)
  });

  ngOnInit(): void {

  }

  constructor(private commonService: CommonServiceService) {}

  onSubmit() {
    const mail = {
      name : this.feedbackForm.value.visitorName,
      email : this.feedbackForm.value.visitorEmail,
      message : this.feedbackForm.value.visitorText 
    }
    this.commonService.mailService(mail).subscribe({
      next: response => {
        this.mailSent = true;
        console.info('Mail Sent!');
        setTimeout(() => {
          this.feedbackForm.reset();
          this.mailSent = false;
        }, 3000)
      },
      error: err => {
        this.mailSent = false;
        console.error('Error: ', err);
      }
    })
  }

}
