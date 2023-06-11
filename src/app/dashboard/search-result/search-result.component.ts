import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  pincodePassedData: any;
  pincode: number = 110001;
  pincodeDetails: any;

  constructor(private route: ActivatedRoute, private commonService: CommonServiceService, private titleService: Title) {
    this.route.paramMap.subscribe( params => {
      this.pincodePassedData = params;
      this.pincode = this.pincodePassedData.params.pincode;
    });
  }

  ngOnInit() {
    const pincodeData = sessionStorage.getItem('pincodeData') || null;
    if(pincodeData) {
      this.pincodeDetails = JSON.parse(pincodeData);
    } else {
      if(this.pincodePassedData) this.getPincodeDetails();
    }
    console.log(this.pincodeDetails);
    this.titleService.setTitle(`Pin Code ${this.pincode} ${this.pincodeDetails?.result[0]?.VillageLocality} ${this.pincodeDetails?.result[0]?.PostOffice} ${this.pincodeDetails?.result[0]?.State}`);
  }

  getPincodeDetails() {
    this.commonService.getPincodeLocation(this.pincode).subscribe({
      next: response => {
        if(response) this.pincodeDetails = response;
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

}
