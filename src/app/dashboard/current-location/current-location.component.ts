import { Component, OnInit } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent implements OnInit {
  visitorIpDetails: any;

  constructor(private commonService: CommonServiceService) { }

  ngOnInit():void {
    this.getIp();
  }

  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude)
      });
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getIp() {
    this.commonService.getVisitorIp().pipe(
      switchMap((response: any) => {
        return this.commonService.getIpDetails(response.ip);
      })
    ).subscribe({
      next: response => {
        this.visitorIpDetails = response;
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

}
