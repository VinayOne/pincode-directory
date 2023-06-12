import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent {

  @Output('callPinSearch') callPinSearch: EventEmitter<any> = new EventEmitter();

  stateList: any;
  districtList: any;
  showDistrictList = false;
  selectedState: string = '';
  showPoList = false;
  selectedDistrict: string = '';
  poList: any;
  pincodeResult: any;
  singlePincode: string = '';
  clearDistrictName: string = '';
  clearPostOffice: string = '';

  constructor(private commonService: CommonServiceService, private router: Router) {}

  ngOnInit(): void{
    const states = sessionStorage.getItem('stateList') || '';
    if(states) {
      this.stateList = JSON.parse(states);
    } else {
      this.getStateList();
    }
  }

  getStateList(){
    this.commonService.getStateList().subscribe({
      next: response => {
        if(response) {
          this.stateList = response;
          sessionStorage.setItem('stateList', JSON.stringify(this.stateList));
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onStateSelect(state: string) {
    this.selectedState = state;
    this.commonService.getsDistrictList(this.selectedState).subscribe({
      next: response => {
        if(response) {
          this.districtList = response;
          this.showDistrictList = true;
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  backToStates() {
    this.showDistrictList = false;
  }

  onDistrictSelect(district: string) {
    this.selectedDistrict =  district || '';
    this.commonService.getsPostOfficeList(this.selectedDistrict).subscribe({
      next: response => {
        if(response) {
          this.poList = response;
          this.showDistrictList = false;
          this.showPoList = true;
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  backToDistricts() {
    this.showDistrictList = true;
    this.showPoList = false;
  }

  onPostOfficeSelect(postOffice: string) {
    const selectedPostOffice: string = postOffice || '';
    this.commonService.getPincodeByPo(selectedPostOffice).subscribe({
      next: response => {
        if(response) {
          this.pincodeResult = response;
          sessionStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
          this.filterPincodeResult();
          this.filterDistrictResult();
          this.filterPostofficeName();
          setTimeout(() => {
            this.viewResult();
            window.scrollTo(0, 0);
          }, 300)
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  filterPincodeResult() {
    const singlePincode = this.pincodeResult.result.map((item: any) => {
       return item.Pincode;
     });
     if(singlePincode[0]) {
       this.singlePincode = singlePincode[0];
     }
   }

   filterDistrictResult() {
    const selectedDistrict = this.pincodeResult.result[0].District?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
    if(selectedDistrict) this.clearDistrictName = selectedDistrict;    
  }

  filterPostofficeName() {
    const selectedPostOffice = this.pincodeResult.result[0].PostOffice?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
    if(selectedPostOffice) this.clearPostOffice = selectedPostOffice;
    
  }

  viewResult(){
    const pincodeData = {
      selectedState: this.pincodeResult.result[0].State.toLowerCase().split(' ').join('-'),
      selectedDistrict: this.clearDistrictName?.toLowerCase().split(' ').join('-'),
      selectedPostOffice: this.clearPostOffice?.toLowerCase().split(' ').join('-'),
      pincode: this.singlePincode
    }
    this.callPinSearch.emit();
    const url = `/pincode/${pincodeData.pincode}/${pincodeData.selectedState}/${pincodeData.selectedDistrict}/${pincodeData.selectedPostOffice}`;
    this.router.navigateByUrl(url);
  }


}
