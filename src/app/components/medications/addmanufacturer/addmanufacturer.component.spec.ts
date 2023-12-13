import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmanufacturerComponent } from './addmanufacturer.component';

describe('AddmanufacturerComponent', () => {
  let component: AddmanufacturerComponent;
  let fixture: ComponentFixture<AddmanufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmanufacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmanufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
