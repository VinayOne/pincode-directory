import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent {

  stateList: any;

  constructor(private commonService: CommonServiceService) {}

  ngOnInit(): void{
    this.getStateList();
  }

  getStateList(){
    this.commonService.getStateList().subscribe({
      next: response => {
        if(response) this.stateList = response;
      },
      error: err => {
        console.log('Error: ', err);
      }
    })
  }
}
