import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

 pageTitle = 'Pin Code Directory | Find Current Location Pin Code';
 hostName='https://pincode.directory';

 constructor(
  private titleService: Title, 
  private metaService: Meta
  ) { }

 ngOnInit(): void{
  this.metaService.addTags([
    {name: 'date', content: '2023-06-29', scheme: 'YYYY-MM-DD'}
  ]);
  this.titleService.setTitle(this.pageTitle);
 }

}
