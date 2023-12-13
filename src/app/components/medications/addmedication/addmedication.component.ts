import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pagable } from '../../../model/pageable.model';
import { ManufacturersService } from '../../../services/manufacturers.service';
import { MedicationsService } from '../../../services/medications.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturersComponent } from '../manufacturers/manufacturers.component';

@Component({
  selector: 'app-addmedication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, ManufacturersComponent],
  providers :[MedicationsService, ManufacturersService],
  templateUrl: './addmedication.component.html',
  styleUrl: './addmedication.component.css'
})
export class AddmedicationComponent implements OnInit{

  medicationForm: FormGroup = new FormGroup({});
  medicationModel: Medication | undefined;
  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;
  tempImageFiles: any[] = [];
  updation: boolean = false;
  loader: boolean = false;
  manufacturerList: any[] =[];
  public pagable: Pagable= { page:0, size:50, sort:'manufacturerId', sortOrder:'DESC' };


  @Input()
  public medicationInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();
  errResponse: string="";

  constructor(private modalService: NgbModal, private fb:FormBuilder, private manufacturerService:ManufacturersService,
    private medicationService:MedicationsService) { }

  ngOnInit(): void {

    this.manufacturerService.getAll(this.pagable).subscribe( (response:any)=> {
      this.manufacturerList = response.content;
    });

    if(this.medicationInfo) {
      this.initialiseMedicationModal(this.medicationInfo);
    }else{
      this.initialiseMedicationModal();
    }
  }

  initialiseMedicationModal(medicationObj: any = null) {
    if (medicationObj == null) {
      this.updation = false;
      this.medicationForm = this.fb.group({
        medicationId: [],
        medicationTitle: [null],
        price: [null],
        images: this.fb.array([]),
        thumbnailImage: [null],
        medicationDescription: [null],
        mediManufacturer: [null],
        medicationCode: [null],
        active: [true],
      });
    } else {
      this.updation = true;
      this.medicationForm = this.fb.group({
        medicationId: [medicationObj.medicationId],
        medicationTitle: [medicationObj.medicationTitle],
        price: [medicationObj.price],
        images: [medicationObj.images],
        thumbnailImage: [medicationObj.thumbnailImage],
        medicationDescription: [medicationObj.medicationtDescription],
        mediManufacturer: [medicationObj.mediManufacturer],
        medicationCode: [medicationObj.medicationCode],
        active: [medicationObj.active],
      });
      this.onSelectOption(medicationObj.mediManufacturer);
      this.tempImageFiles = medicationObj.images || [];
    }
  }

  onSelectOption(manufacturer: any) {
    this.medicationForm.patchValue({
      manufacturer: this.manufacturerList.find(x => x.manufacturerId === manufacturer.manufacturerId)
    })
  }

  close() {
    this.closeModel.emit();
  }

  // open image
  openImage(url: string) {
    window.open(url, "_blank")
  }

  removeImage(idx: number) {
    this.tempImageFiles.splice(idx, 1);
  }

  changeThumbnailImageIdx(idx: number) {
    this.medicationForm.patchValue({
      thumbnailImage: idx
    })
  }

  checkImageFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        // this.toast.warning("Only .png/.jpeg/.jpg file format accepted!!", file.name + " will not accepted.");
      }
    });
  }

  compareByManufacturerId(category1: Manufacturer, category2: Manufacturer) {
    return category1 && category2 && category1.manufacturerId === category2.manufacturerId;
  }

  onSubmit() {
    if(this.medicationForm.valid) {
      if(this.medicationForm.get('medicationId')?.value) {
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
    this.medicationService.add(this.medicationForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      // this.router.navigateByUrl('/users');
      window.location.href ="/medications";
      this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }

  handleUpdate() {
    this.medicationService.update(this.medicationForm.getRawValue()).subscribe((response:any)=>{
      // console.log(response);
      window.location.href ="/medications";
        this.close();
      },error =>{
        this.errResponse = error.error.message;
      })
  }
  
}export interface Medication {
  medicationId?: string;
  medicationTitle?: string;
  medicationDescription?: string;
  medicationCode?: string;
  price?: number;
  mediManufacturer?: Manufacturer;
  images?: string[];
  thumbnailImage?: number;
  createdAt?: Date;
}

export interface Manufacturer {
  manufacturerId?: string;
  manufacturerName?: string;
  manufacturerLicanse?: string;
  manufacturerAddress?: string;
  manufacturerLogoUrl?: string;
  createdAt?: Date;
  active?: boolean;
}
