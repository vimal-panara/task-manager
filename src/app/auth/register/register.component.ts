import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    var isLoginSuccess = this.authService.register(
      this.registerForm.value.username ?? "",
      this.registerForm.value.password ?? ""
    );
    if(isLoginSuccess){
      this.router.navigate(['/tasks'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

  onLoginRedirect() {
    this.router.navigate(['/auth'])
  }
}
