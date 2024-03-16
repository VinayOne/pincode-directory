import { Component,Inject, PLATFORM_ID } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';
import {BehaviorSubject, filter} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

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
    private localStorage: LocalstorageService,
    private gtmService: GoogleTagManagerService,
    private router: Router
    ) {
      AppComponent.isBrowser.next(isPlatformBrowser(platformId));    
      }

  ngOnInit(): void{
    this.sendGtmEvents()
  }

  sendGtmEvents() {
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
          const gtmTag = {
              event: 'page',
              pageName: item.url
          };
          this.gtmService.pushTag(gtmTag);
      }
  });
}
}
