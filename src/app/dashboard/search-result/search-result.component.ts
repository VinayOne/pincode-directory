import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  pincodePassedData: any;
  pincode: number = 110001;
  pincodeDetails: any;

  constructor(private route: ActivatedRoute, private commonService: CommonServiceService) {
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
