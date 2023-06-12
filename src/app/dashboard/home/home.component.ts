import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

 pageTitle = 'Pincode Directory | Find Current Location Pin Code - Home';

 constructor(private titleService: Title) { }

 ngOnInit(): void{
  this.titleService.setTitle(this.pageTitle);
 }

}
