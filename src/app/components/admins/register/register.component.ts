import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm:FormGroup;
  public errorReponse:string="";
  public stReponse:string="";

  constructor(private authService: AuthService, private router: Router) { 
    this.registerForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':  new FormControl(null,[Validators.required, Validators.minLength(8)]),
      'passwordConfirmation': new FormControl(null, [Validators.required]),
      'firstName':  new FormControl(null,[Validators.required]),
      'lastName':  new FormControl(null,[Validators.required]),
      'adminUserName':  new FormControl(null,[Validators.required]),
      "loginType": new FormControl(1),
    }, { validators: passwordMatchingValidatior });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.authService.registerAdmin(this.registerForm.value).subscribe( (response :any) =>{
        console.log(response);
        
        this.stReponse = response.message;
        this.registerForm.reset();
        
        this.router.navigateByUrl("/auth/login");
      },error =>{
        this.errorReponse = error.error.message;
      })
    }else{
      this.errorReponse = "Enable to submit form, Invalid form data";
      console.log("Invalid Form");
    }
  }

}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');

  return password?.value === passwordConfirmation?.value ? null : { notmatched: true };
  
}
