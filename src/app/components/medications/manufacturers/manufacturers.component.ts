import { Component, OnInit } from '@angular/core';
import { Pagable } from '../../../model/pageable.model';
import { ManufacturersService } from '../../../services/manufacturers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AddmanufacturerComponent } from '../addmanufacturer/addmanufacturer.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicationsService } from '../../../services/medications.service';

@Component({
  selector: 'app-manufacturers',
  standalone: true,
  imports: [CommonModule, AddmanufacturerComponent, RouterLink, RouterModule, ReactiveFormsModule],
  providers :[MedicationsService, ManufacturersService],
  templateUrl: './manufacturers.component.html',
  styleUrl: './manufacturers.component.css'
})
export class ManufacturersComponent implements OnInit{

  public manufacturersList:any[] =[];
  public manufacturerInfo:any;
  public pagable:Pagable= { page:0, size:10, sort:'manufacturerId', sortOrder:'DESC' };

  constructor(private manufacturersService:ManufacturersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllManufacturers();
  }

  getAllManufacturers() {
    this.manufacturersService.getAll(this.pagable).subscribe( (response:any)=> {
      // console.log(response);
      this.manufacturersList = response.content;
    })
  }
  
  openMedicationManufacturerDialog(modelRef:any, medicationManufacturerObj = null) {
    this.modalService.open(modelRef);
    this.manufacturerInfo = medicationManufacturerObj;
  }

  closeModel(modelRef:any) {
    this.modalService.dismissAll(modelRef);
  }

  delete(manufacturerId:any) {
    this.manufacturersService.delete(manufacturerId).subscribe((response:any ) => {
      this.getAllManufacturers();
    });
  }
}
