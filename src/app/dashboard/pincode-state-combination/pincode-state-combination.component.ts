import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface pinCodeCircles {
  circle: string;
  pin: string;
}

const ELEMENT_DATA: pinCodeCircles[] = [
  {pin: '11', circle: 'Delhi'},
  {pin: '12 and 13', circle: 'Haryana (Kamania)'},
  {pin: '14 to 15', circle: 'Punjab'},
  {pin: '16', circle: 'Chandigarh'},
  {pin: '17', circle: 'Himachal Pradesh'},
  {pin: '18 to 19', circle: 'Jammu and Kashmir'},
  {pin: '20 to 28', circle: 'Uttar Pradesh and Uttarakhand'},
  {pin: '30 to 34', circle: 'Rajasthan'},
  {pin: '36 to 39', circle: 'Gujarat'},
  {pin: '40', circle: 'Goa'},
  {pin: '40 to 44', circle: 'Maharashtra'},
  {pin: '45 to 48', circle: 'Madhya Pradesh'},
  {pin: '49', circle: 'Chhattisgarh'},
  {pin: '50', circle: 'Telangana'},
  {pin: '51 to 53', circle: 'Andhra pradesh'},
  {pin: '56 to 59', circle: 'Karnataka'},
  {pin: '60 to 64', circle: 'Tamil Nadu'},
  {pin: '67 to 69', circle: 'Kerala'},
  {pin: '682', circle: 'Lakshadweep (Islands)'},
  {pin: '70 to 74', circle: 'West Bengal'},
  {pin: '744', circle: 'Andaman and Nicobar Islands'},
  {pin: '75 to 74', circle: 'Odisha'},
  {pin: '78', circle: 'Assam'},
  {pin: '79', circle: 'Arunachal Pradesh'},
  {pin: '793, 794, 783123', circle: 'Meghalaya'},
  {pin: '795', circle: 'Manipur'},
  {pin: '796', circle: 'Mizoram'},
  {pin: '799', circle: 'Tripura'},
  {pin: '80 to 85', circle: 'Bihar and Jharkhand'},
  {pin: '90 to 99', circle: 'Army Postal Service (APS)'}
];

@Component({
  selector: 'app-pincode-state-combination',
  templateUrl: './pincode-state-combination.component.html',
  styleUrls: ['./pincode-state-combination.component.scss']
})
export class PincodeStateCombinationComponent {

  displayedColumns: string[] = ['pin', 'circle'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
