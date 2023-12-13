import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturersService } from '../../../services/manufacturers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManufacturersComponent } from '../manufacturers/manufacturers.component';

@Component({
  selector: 'app-addmanufacturer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, ManufacturersComponent],
  templateUrl: './addmanufacturer.component.html',
  styleUrl: './addmanufacturer.component.css'
})
export class AddmanufacturerComponent implements OnInit{

  mediManufacturerBool: boolean = true;
  medicationManufacturerForm:FormGroup = new FormGroup({});
  loader : boolean = false;
  tempFile: any;

  @Input()
  public manufacturerInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  public errResponse: string ="";

  constructor( private modalService: NgbModal,  private fb:FormBuilder, private manufacturerService: ManufacturersService) { }

  ngOnInit(): void {
    if(this.manufacturerInfo) {
      this.initialForm(this.manufacturerInfo);
    } else{
      this.initialForm();
    }
  }

  initialForm(medicationManufacturerObj: any = null) {
    if (medicationManufacturerObj === null) {
      this.medicationManufacturerForm = this.fb.group({
        manufacturerName: ["", Validators.required],
        manufacturerLicense: ["", Validators.required],
        address: [""],
        manufacturerLogoUrl: [""],
        manufacturerId: [null],
        active: [true],
      });
    } else {
      this.medicationManufacturerForm = this.fb.group({
        manufacturerId: [medicationManufacturerObj.manufacturerId],
        manufacturerName: [medicationManufacturerObj.manufacturerName, Validators.required],
        manufacturerLicense: [medicationManufacturerObj.manufacturerLicense, Validators.required],
        address: [medicationManufacturerObj.address],
        manufacturerLogoUrl: [medicationManufacturerObj.manufacturerLogoUrl],
        active: [medicationManufacturerObj.active],
      });
    }
  }

  onSubmit() {
    if(this.medicationManufacturerForm.valid) {
      if(this.medicationManufacturerForm.get('manufacturerId')?.value) {
        this.handleUpdate();
      } else{
        this.handleCreate();
      }
    } else{
      this.errResponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

  handleCreate() {
    this.manufacturerService.add(this.medicationManufacturerForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/users');
      window.location.href ="/medications/manufacturers";
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.manufacturerService.update(this.medicationManufacturerForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/medications/manufacturers";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  checkFileType(event: any) {
    this.tempFile = event.target.files[0];
    if (
      this.tempFile.type == "image/png" ||
      this.tempFile.type == "image/jpeg" ||
      this.tempFile.type == "image/jpg"
    ) {
      // console.log("File Ok");
    } else {
      // console.log("File not Ok");
      this.tempFile = null;
      // this.toast.show("Only .png/.jpeg/.jpg file format accepted!!");
    }
  }

  close() {
    this.closeModel.emit();
  }
  
}
