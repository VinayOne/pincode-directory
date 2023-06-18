import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output('callPinSearch') callPinSearch: EventEmitter<any> = new EventEmitter();

  //stateList: any;
  states: string[] = [];
  filteredStates?: Observable<string[]>;
  districts: string[] = [];
  showDistrictSpinner = false;
  filteredDistricts?: Observable<string[]>;
  postOffices: string[] = [];
  showPostOfficeSpinner = false;
  filteredPostOffices?: Observable<string[]>;
  pincodeResult: any;

  singlePincode: any;
  clearDistrictName = '';
  clearPostOffice = '';

  enableSearchBtn = false;
  invalidPincode = false;
  browserUrl: string = '';

  pincodeForm = new FormGroup({
    stateName: new FormControl('', Validators.required),
    districtName: new FormControl({ value: '', disabled: true }, Validators.required),
    postOfficeName: new FormControl({ value: '', disabled: true }, Validators.required),
    pinCode: new FormControl('', Validators.pattern("^[0-9]*$"))
  });

  constructor(
    private commonService: CommonServiceService,
    private router: Router,
    private localStorage: LocalstorageService,   
  ) { 
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.browserUrl = event.url;
      this.findPincodeInUrl();
    });
  }

  ngOnInit(): void {
    this.getStateList();
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter((state) => state.toLowerCase().includes(filterValue));
  }

  private _filterDistrict(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.districts.filter((district) => district.toLowerCase().includes(filterValue));
  }

  private _filterPostoffice(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.postOffices.filter((po) => po.toLowerCase().includes(filterValue));
  }

  getStateList() {
    let stateList: any;
    this.commonService.getStateList().subscribe({
      next: response => {
        if (response) {
          stateList = response;
          this.states = stateList.result;
          this.filteredStates = this.pincodeForm.controls['stateName'].valueChanges.pipe(
            startWith(''),
            map(value => this._filterState(value || '')),
          );
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onStateSelect() {
    this.showDistrictSpinner = true;
    this.pincodeForm.controls.districtName.reset();
    let districtList: any;
    const selectedState: string = this.pincodeForm.value.stateName || '';
    this.commonService.getsDistrictList(selectedState).subscribe({
      next: response => {
        if (response) {
          districtList = response;
          this.districts = districtList.result;
          this.showDistrictSpinner = false;
          this.pincodeForm.controls.districtName.enable();
          this.filteredDistricts = this.pincodeForm.controls['districtName'].valueChanges.pipe(
            startWith(''),
            map(value => this._filterDistrict(value || '')),
          );
          this.pincodeForm.controls.pinCode.reset();
        }
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }

  onDistrictSelect() {
    this.showPostOfficeSpinner = true;
    this.pincodeForm.controls.postOfficeName.reset();
    let postOfficeList: any;
    const selectedDistrict: string = this.pincodeForm.value.districtName || '';
    this.commonService.getsPostOfficeList(selectedDistrict).subscribe({
      next: response => {
        if (response) {
          postOfficeList = response;
          this.postOffices = postOfficeList.result;
          this.showPostOfficeSpinner = false;
          this.pincodeForm.controls.postOfficeName.enable();
          this.filteredPostOffices = this.pincodeForm.controls['postOfficeName'].valueChanges.pipe(
            startWith(''),
            map(value => this._filterPostoffice(value || '')),
          );
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
        if (response) {
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

  onSubmit() {
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
    if (singlePincode[0]) {
      this.invalidPincode = false;
      this.singlePincode = singlePincode[0];
    } else {
      this.invalidPincode = true;
      return;
    }
  }

  filterDistrictResult() {
    const selectedDistrict = this.pincodeResult.result[0].District?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
    if (selectedDistrict) this.clearDistrictName = selectedDistrict;
  }

  filterPostofficeName() {
    const selectedPostOffice = this.pincodeResult.result[0].PostOffice?.replace(/[^a-zA-Z0-9 ]/g, '') || '';
    if (selectedPostOffice) this.clearPostOffice = selectedPostOffice;
  }

  checkValidity() {
    const searchPin = this.pincodeForm.value.pinCode || '';
    if (searchPin.length === 6 || this.pincodeForm.valid) {
      this.enableSearchBtn = true;
      if (searchPin.length === 6) {
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
        if (response) {
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
    const pincode = this.browserUrl.match(/\d+/g) || [];
    if (pincode[0] && pincode[0].length === 6) {
      this.commonService.getPincodeLocation(JSON.parse(pincode[0])).subscribe({
        next: response => {
          if (response) {
            this.pincodeResult = response;
            this.localStorage.setItem('pincodeData', JSON.stringify(this.pincodeResult));
            this.filterPincodeResult();
            this.filterDistrictResult();
            this.filterPostofficeName();
            setTimeout(() => {
              this.onSubmit();
            }, 300);
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
