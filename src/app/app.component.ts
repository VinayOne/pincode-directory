import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';
import {BehaviorSubject, filter} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static isBrowser = new BehaviorSubject<boolean>(false);
  title = 'pincode-directory';
  visitorData: any;
  currentTime = new Date();
  excludeIpList = ['125.99.240.100', '144.24.59.157'];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private commonService: CommonServiceService,
    private localStorage: LocalstorageService
    ) {
      AppComponent.isBrowser.next(isPlatformBrowser(platformId));      
      }

  ngOnInit(): void{    
    this.fetchVisitorDetails();
    setTimeout(() => {
      if(!this.excludeIpList.includes(this.visitorData.ip)) {
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
