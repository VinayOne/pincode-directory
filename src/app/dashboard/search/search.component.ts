import { Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router'
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from '../../services/window.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output('callPinSearch') callPinSearch: EventEmitter<any> = new EventEmitter();
  
  states: any;
  districts: any;
  postOffices: any;
  pincodeResult: any;

  singlePincode: any;
  clearDistrictName = '';
  clearPostOffice = '';
  
  enableSearchBtn = false;
  invalidPincode = false;
  browserUrl: string = '';

  pincodeForm = new FormGroup({
    stateName: new FormControl('', Validators.required),
    districtName: new FormControl('', Validators.required),
    postOfficeName: new FormControl('', Validators.required),
    pinCode: new FormControl('',Validators.pattern("^[0-9]*$"))
  });

  constructor(
    private commonService: CommonServiceService, 
    private router: Router,
    private localStorage: LocalstorageService,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowRef: WindowRef
    ) {}

  ngOnInit(): void {
    this.getStateList();
    this.findPincodeInUrl();
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
          this.pincodeForm.controls.pinCode.reset();
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
          this.checkValidity();
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
          this.pincodeResult = response;
          this.localStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
          this.filterPincodeResult();
          this.filterDistrictResult();
          this.filterPostofficeName();
          this.checkValidity();
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onSubmit(){
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

  filterPincodeResult() {
   const singlePincode = this.pincodeResult.result.map((item: any) => {
      return item.Pincode;
    });
    if(singlePincode[0]) {
      this.invalidPincode = false;
      this.singlePincode = singlePincode[0];
    } else {
      this.invalidPincode = true;
      return;     
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

  checkValidity() {
    const searchPin = this.pincodeForm.value.pinCode || '';
    if(searchPin.length === 6 || this.pincodeForm.valid) {
      this.enableSearchBtn = true;
      if(searchPin.length === 6) {
        this.pincodeForm.controls.stateName.reset();
        this.pincodeForm.controls.districtName.reset();
        this.pincodeForm.controls.postOfficeName.reset();
        this.searchPin(parseInt(searchPin));
      }
    } else {
      this.enableSearchBtn = false;
    }
  }

  searchPin(searchPin: number) {
    this.commonService.getPincodeLocation(searchPin).subscribe({
      next: response => {
        if(response) {
          this.pincodeResult = response;
          this.localStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
          this.filterPincodeResult();
          this.filterDistrictResult();
          this.filterPostofficeName();
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  findPincodeInUrl() {
    if(isPlatformBrowser(this.platformId)) {
      this.browserUrl = this.windowRef.nativeWindow.location.href;
    }    
    const pincode = this.browserUrl.match(/\d+/g) || [];
    if(pincode[0] && pincode[0].length === 6) {
      this.commonService.getPincodeLocation(JSON.parse(pincode[0])).subscribe({
        next: response => {
          if(response) {
            this.pincodeResult = response;
            this.localStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
            this.filterPincodeResult();
            this.filterDistrictResult();
            this.filterPostofficeName();
            setTimeout(() => {
              this.onSubmit();
            },300);
          }
        },
        error: err => {
          console.log('Error: ', err);
        }
      })
    } else {
      console.info('Error: Invalid Or No Pin Code in URL');
    }
  }

}
