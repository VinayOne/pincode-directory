import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentSearchComponent } from './frequent-search.component';

describe('FrequentSearchComponent', () => {
  let component: FrequentSearchComponent;
  let fixture: ComponentFixture<FrequentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequentSearchComponent]
    });
    fixture = TestBed.createComponent(FrequentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
