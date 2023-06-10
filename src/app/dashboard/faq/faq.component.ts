import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  items = [
    {
    question: 'How can I find the Pincode for a specific address in India?', 
    answer: 'You can use www.pincode.directory to find pincodes. Also you can explore other online tools, postal websites, or the official Indian Postal Department website to search for Pincodes based on addresses.'
  },
  {
    question: 'How many types of Post Office exist & what are HO, BO & SO?', 
    answer: 'Post offices are classified into 3 types. Head Post Office - HO, Sub Post Office - SO & Branch Post Office - BO'
  },
    {
      question: 'Can a single Pincode represent multiple areas or post offices?', 
      answer: 'No, each Pincode represents a specific post office or an area within a post office\'s jurisdiction.',
    }, 
    {
      question: 'Are Pincodes the same across all states in India?', 
      answer: 'Pincodes vary across states and regions, as they are designed to provide localized identification and sorting.'
    }, 
    {
      question: 'Can Pincodes change over time?', 
      answer: 'Pincodes can be changed or modified in certain cases, such as the establishment of new post offices or reorganization of postal services. It\'s important to stay updated with the latest Pincode information.'
    }, 
    {
      question: 'Are Pincodes applicable only to physical addresses, or do they also apply to email addresses?', 
      answer: 'Pincodes are specific to physical addresses in India and do not have any relevance to email addresses or digital communication.'
    }
  ];
  expandedIndex = 0;

}
