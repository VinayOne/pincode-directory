import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeStateCombinationComponent } from './pincode-state-combination.component';

describe('PincodeStateCombinationComponent', () => {
  let component: PincodeStateCombinationComponent;
  let fixture: ComponentFixture<PincodeStateCombinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PincodeStateCombinationComponent]
    });
    fixture = TestBed.createComponent(PincodeStateCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
