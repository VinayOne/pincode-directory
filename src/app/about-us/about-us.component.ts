import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  pageTitle = 'Pin Code Directory - About Us';

  constructor(private titleService: Title, private metaService: Meta) {}


ngOnInit(): void{
  this.metaService.updateTag({name: 'description', content: 'Pin Code Directory - About Us'});
  this.titleService.setTitle(this.pageTitle);
}

}
