import { Component } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pincode-directory';
  visitorData: any;
  currentTime = new Date();

  constructor(private commonService: CommonServiceService) {}

  ngOnInit(): void{
    this.fetchVisitorDetails();
    setTimeout(() => {
      if(this.visitorData.ip !== '125.99.240.100') {
        this.captureVisitorDetails();
      } else {
        console.info('Developer Visit');
      }     
    }, 1000)
  }

  fetchVisitorDetails() {
    this.commonService.getVisitorIpDetail().subscribe({
      next: response => {
        if(response) this.visitorData = response;
      },
      error: err => {
        console.error('Error: ', err);
      }
    })
  }

  captureVisitorDetails() {
    const payLoad = {
      ip : this.visitorData.ip,
      country: this.visitorData.country_name,
      visitedtime: this.currentTime
    }

    this.commonService.captureVisitorData(payLoad).subscribe({
      next: response => {
        if(response) console.info('STATUS 200 - OK');
      },
      error: err => {
        console.error('Error: ', err);
      }
    })
  }
}
