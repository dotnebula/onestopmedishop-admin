import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedicationsComponent } from '../medications.component';

@Component({
  selector: 'app-viewmedication',
  standalone: true,
  imports: [CommonModule, MedicationsComponent],
  templateUrl: './viewmedication.component.html',
  styleUrl: './viewmedication.component.css'
})
export class ViewmedicationComponent implements OnInit {

  @Input()
  public medicationInfo:any;


  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }


  close() {
    this.closeModel.emit();
  }
  
}
