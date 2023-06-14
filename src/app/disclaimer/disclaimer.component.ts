import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent {

pageTitle = 'Pin Code Directory - Disclaimer';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void{
    this.metaService.updateTag({name: 'description', content: 'Pin Code Directory - Disclaimer'});
    this.titleService.setTitle(this.pageTitle);
  }

}
