import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  states: any;
  districts: any;
  postOffices: any;
  pincodeResult: any;

  singlePincode: any;
  clearDistrictName = '';
  
  submitted = false;

  pincodeForm = new FormGroup({
    stateName: new FormControl('', Validators.required),
    districtName: new FormControl('', Validators.required),
    postOfficeName: new FormControl('', Validators.required)
  });

  constructor(private commonService: CommonServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getStateList();
  }

  getStateList() {
    this.commonService.getStateList().subscribe({
      next: response => {
        if(response) {
          this.states = response;
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onStateSelect() {
    const selectedState: string = this.pincodeForm.value.stateName || '';
    this.commonService.getsDistrictList(selectedState).subscribe({
      next: response => {
        if(response) {
          this.districts = response;
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onDistrictSelect() {
    const selectedDistrict: string = this.pincodeForm.value.districtName || '';
    this.commonService.getsPostOfficeList(selectedDistrict).subscribe({
      next: response => {
        if(response) {
          this.postOffices = response;
          this.filterDistrictResult();
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onPostOfficeSelect() {
    const selectedPostOffice: string = this.pincodeForm.value.postOfficeName || '';
    this.commonService.getPincodeByPo(selectedPostOffice).subscribe({
      next: response => {
        if(response) {
          console.log('pincode: ', response);
          this.pincodeResult = response;
          sessionStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
          this.filterPincodeResult();
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onSubmit(){
    this.submitted = true;
    const pincodeData = {
      selectedState: this.pincodeForm.value.stateName?.toLowerCase().split(' ').join('-'),
      selectedDistrict: this.clearDistrictName?.toLowerCase().split(' ').join('-'),
      selectedPostOffice: this.pincodeForm.value.postOfficeName?.toLowerCase().split(' ').join('-'),
      pincode: this.singlePincode
    }

    const url = `/pincode/${pincodeData.pincode}/${pincodeData.selectedState}/${pincodeData.selectedDistrict}/${pincodeData.selectedPostOffice}`;
    this.router.navigateByUrl(url);
  }

  filterPincodeResult() {
   const singlePincode = this.pincodeResult.result.map((item: any) => {
      return item.Pincode;
    });
    this.singlePincode = singlePincode[0];
    console.log(singlePincode[0]);
  }

  filterDistrictResult() {
    const selectedDistrict = this.pincodeForm.value.districtName?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
    this.clearDistrictName = selectedDistrict;
  }

}
