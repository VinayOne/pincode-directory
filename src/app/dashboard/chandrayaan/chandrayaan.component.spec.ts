import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChandrayaanComponent } from './chandrayaan.component';

describe('ChandrayaanComponent', () => {
  let component: ChandrayaanComponent;
  let fixture: ComponentFixture<ChandrayaanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChandrayaanComponent]
    });
    fixture = TestBed.createComponent(ChandrayaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
