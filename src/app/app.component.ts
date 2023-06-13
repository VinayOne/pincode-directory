import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';
import { Meta, Title } from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private commonService: CommonServiceService, 
    private titleService: Title, private meta: Meta
    ) {
      AppComponent.isBrowser.next(isPlatformBrowser(platformId));
      }

  ngOnInit(): void{
    this.meta.addTags([
      {name: 'discription', content: 'Get your street or area Pin Code with this easy to use Pincode Directory! Find your current location Pin Code with this quick and easy online tool. Ex URL: https://pincode.directory/110054'},
      {name: 'author' , content: 'Vinay Kumar Munda'},
      {name: 'robots', content: 'index, follow'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'keywords', content: 'pincode, pincode of my location, current location pin code, my current location pin code, my area pin code'},
      {name: 'date', content: '2023-06-13', scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'}
    ]);
    
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
