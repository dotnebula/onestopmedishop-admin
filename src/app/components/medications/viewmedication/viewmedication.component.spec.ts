import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicationComponent } from './viewmedication.component';

describe('ViewmedicationComponent', () => {
  let component: ViewmedicationComponent;
  let fixture: ComponentFixture<ViewmedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewmedicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewmedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
