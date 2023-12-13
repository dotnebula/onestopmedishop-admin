import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm:FormGroup;
  public errorReponse:string="";

  constructor(private authService: AuthService, private router:Router, ) { 
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':  new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.loginAdmin(this.loginForm.value).subscribe( (response :any) =>{
        console.log(response);
        localStorage.setItem('x-auth-token', JSON.stringify(response?.data?.authToken));
        localStorage.setItem('x-admin-id', JSON.stringify(response?.data?.adminId));
        localStorage.setItem('x-admin-name', JSON.stringify(response?.data?.adminUserName));
        this.router.navigateByUrl("/medications");
      },error =>{
        this.errorReponse = error.error.message;
      })
    }else{
      this.errorReponse = "Invalid LogIn Crudencials";
      console.log("Invalid Form");
    }
  }
  
}
