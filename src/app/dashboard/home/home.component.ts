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
    {name: 'description', content: 'Get your area Pin Code with this easy-to-use Pin Code Directory! Search for current location pin code or pincode of my location with this quick & easy tool.'},
    {name: 'author' , content: 'Vinay Kumar Munda'},
    {name: 'robots', content: 'index, follow'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'keywords', content: 'pin code, pincode of my location, current location pin code, my current location pin code, my area pin code'},
    {name: 'date', content: '2023-06-15', scheme: 'YYYY-MM-DD'},
    {charset: 'utf-8'}
  ]);
  this.titleService.setTitle(this.pageTitle);
 }

}
