import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Pagable } from '../../model/pageable.model';

import { MedicationsService } from '../../services/medications.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewmedicationComponent } from './viewmedication/viewmedication.component';
import { AddmedicationComponent } from './addmedication/addmedication.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddmanufacturerComponent } from './addmanufacturer/addmanufacturer.component';

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [ViewmedicationComponent, AddmedicationComponent, AddmanufacturerComponent, RouterLink, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './medications.component.html',
  styleUrl: './medications.component.css'
})
export class MedicationsComponent implements OnInit{

  public medicationList:any[] =[];
  public medicationInfo:any;

  public selectedImageIdx: number = 0;
  public thumbnailImageIdx: number = 0;
  public tempImageFiles: any[] = [];
  public pagable:Pagable= { page:0, size:10, sort:'medicationId', sortOrder:'DESC' };

  constructor(private medicationsService: MedicationsService, private modalService: NgbModal) { }
  
  ngOnInit(): void {
    this.getAllMedication();
  }

  getAllMedication() {
    this.medicationsService.getAll(this.pagable).subscribe((response:any)=> {
      console.log(response);
      this.medicationList = response.content;
    })
  }

  openModal(modelRef:any, medicationObj = null) {
    this.modalService.open(modelRef, { size: "xl" });
    this.medicationInfo = medicationObj;
  }

  openViewModal(modelRef:any, medicationObj = null) {
    this.modalService.open(modelRef, { size: "l" });
    this.medicationInfo = medicationObj;
  }

  openImageModal(modal: any, imageUrls: string[], thumbnailImageIdx: number) {
    this.tempImageFiles = [...imageUrls];
    this.thumbnailImageIdx = thumbnailImageIdx;
    this.modalService.open(modal, { 
      size: "xl",
      scrollable: true 
    });
  }

  openImage(url: string) {
      window.open(url, "_blank")
  }

  delete(medicationId:any) {
    this.medicationsService.delete(medicationId).subscribe(response=>{
      this.getAllMedication();
    })
  }

  closeModel(modelRef:any) {
    this.modalService.dismissAll(modelRef);
  }

}

