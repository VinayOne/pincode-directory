import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

 pageTitle = 'Pincode Directory | Find Current Location Pin Code - Home';

 constructor(private titleService: Title, private metaService: Meta) { }

 ngOnInit(): void{
  this.metaService.addTags([
    {name: 'description', content: 'Get your street or area Pin Code with this easy to use Pincode Directory! Find your current location Pin Code with this quick and easy online tool. Ex URL: https://pincode.directory/110054'},
    {name: 'author' , content: 'Vinay Kumar Munda'},
    {name: 'robots', content: 'index, follow'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'keywords', content: 'pincode, pincode of my location, current location pin code, my current location pin code, my area pin code'},
    {name: 'date', content: '2023-06-13', scheme: 'YYYY-MM-DD'},
    {charset: 'utf-8'}
  ]);
  this.titleService.setTitle(this.pageTitle);
 }

}
