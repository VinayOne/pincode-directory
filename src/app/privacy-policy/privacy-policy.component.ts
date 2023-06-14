import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  
  pageTitle = 'Pin Code Directory - Privacy Policy';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void{
    this.metaService.updateTag({name: 'description', content: 'Pin Code Directory - Privacy Policy'});
    this.titleService.setTitle(this.pageTitle);
  }

}
