import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  pincodePassedData: any;
  pincode: number = 110001;
  pincodeDetails: any;

  constructor(private route: ActivatedRoute, 
    private commonService: CommonServiceService, 
    private titleService: Title, 
    private meta: Meta,
    private localStorage: LocalstorageService
    ) {
    this.route.paramMap.subscribe(params => {
      this.pincodePassedData = params;
      this.pincode = this.pincodePassedData.params.pincode;
    });
  }

  ngOnInit() {
    const pincodeData = this.localStorage.getItem('pincodeData') || null;
    if (pincodeData) {
      this.pincodeDetails = JSON.parse(pincodeData)?.result;
    } else {
      if (this.pincodePassedData) this.getPincodeDetails();
    }
    this.titleService.setTitle(`Pin Code: ${this.pincodeDetails[0]?.Pincode} - ${this.pincodeDetails[0]?.VillageLocality} - ${this.pincodeDetails[0]?.PostOffice} - ${this.pincodeDetails[0]?.State}`);
    this.meta.updateTag(
      { name: 'discription', content: `Pin code: ${this.pincodeDetails[0]?.Pincode} is belong to ${this.pincodeDetails[0]?.VillageLocality}, ${this.pincodeDetails[0]?.PostOffice}, ${this.pincodeDetails[0]?.State}` },
    );
    this.meta.updateTag({ name: 'keywords', content: `pin code ${this.pincodeDetails[0]?.Pincode}, pin code ${this.pincodeDetails[0]?.VillageLocality}, pin code ${this.pincodeDetails[0]?.PostOffice}` });
  }

  getPincodeDetails() {
    let pincodeData: any;
    this.commonService.getPincodeLocation(this.pincode).subscribe({
      next: response => {
        if (response) {
          pincodeData = response;
          this.pincodeDetails = pincodeData.result;
          console.log(this.pincodeDetails);
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    //this.pincodeDetails = this.pincodeDetails.filter((data: any) => data.includes(filterValue));
    console.log('filter: ', filterValue)
  }

}
