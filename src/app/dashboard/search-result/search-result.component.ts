import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
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

  constructor(private route: ActivatedRoute, private commonService: CommonServiceService, private titleService: Title, private meta: Meta) {
    this.route.paramMap.subscribe(params => {
      this.pincodePassedData = params;
      this.pincode = this.pincodePassedData.params.pincode;
    });
  }

  ngOnInit() {
    const pincodeData = sessionStorage.getItem('pincodeData') || null;
    if (pincodeData) {
      this.pincodeDetails = JSON.parse(pincodeData);
    } else {
      if (this.pincodePassedData) this.getPincodeDetails();
    }
    this.titleService.setTitle(`Pin Code: ${this.pincodeDetails?.result[0]?.Pincode} - ${this.pincodeDetails?.result[0]?.VillageLocality} - ${this.pincodeDetails?.result[0]?.PostOffice} - ${this.pincodeDetails?.result[0]?.State}`);
    this.meta.updateTag(
      { name: 'discription', content: `Pin code: ${this.pincodeDetails?.result[0]?.Pincode} is belong to ${this.pincodeDetails?.result[0]?.VillageLocality}, ${this.pincodeDetails?.result[0]?.PostOffice}, ${this.pincodeDetails?.result[0]?.State}` },
    );
    this.meta.updateTag({ name: 'keywords', content: `pin code ${this.pincodeDetails?.result[0]?.Pincode}, pin code ${this.pincodeDetails?.result[0]?.VillageLocality}, pin code ${this.pincodeDetails?.result[0]?.PostOffice}` });
  }

  getPincodeDetails() {
    this.commonService.getPincodeLocation(this.pincode).subscribe({
      next: response => {
        if (response) this.pincodeDetails = response;
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

}
