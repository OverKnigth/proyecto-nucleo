import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { confirmPasswordReset } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMensage: string = "";
  showRegister: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [this.confirmPasswordValidator()]]
    })
  }

  loginGoogle(){
    this.authService.loginWithGoogle()
    .then(() => {console.log("Login Exitoso");})
    .catch((err => 
    {
      console.log(err);
      this.errorMensage = err.errorMensage
    }
    ));
  }

  login(){
    if(this.loginForm.invalid) return;
    if(this.showRegister){
      this.authService.registerWithEmail(this.email?.value, this.password?.value)
      .then(() => {console.log("Registro Exitoso");})
      .catch((err => {
        console.log(err);
        this.errorMensage = err.errorMensage
      }));
      return;
    }
    this.authService.loginWithEmail(this.email?.value, this.password?.value)
    .then(() => {console.log("Login Exitoso");})
    .catch((err => {
      console.log(err);
      this.errorMensage = err.errorMensage
    }));
  }

  toggleRegister(){
    this.showRegister = !this.showRegister
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.showRegister) return null;
      const error = this.password?.value != control.value;
      return error ? {confirmPassword: {value: control.value}} : null;
    };
  }

  get email(){return this.loginForm.get("email")};
  get password(){return this.loginForm.get("password")};
  get confirmPassword(){return this.loginForm.get("confirmPassword")};



}
