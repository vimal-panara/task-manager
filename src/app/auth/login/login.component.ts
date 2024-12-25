import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/tasks'])
    }
  }

  ngOnInit(): void {
    var availableUsers = this.authService.getUsers();
    if(availableUsers.length <= 0) {
      alert("no users have been registered on this machine. Redirecting you on the Registration page");
      this.router.navigate(['/auth/register'])
    }
  }

  onLogin() {
    var isLoginSuccess = this.authService.login(
      this.loginForm.value.username ?? "", 
      this.loginForm.value.password ?? ""
    );
    if (!isLoginSuccess) {
      alert('wrong credentials');
    } else {
      this.router.navigate(['/tasks'])
    }
  }

  onRegisterRedirect() {
    this.router.navigate(['/auth/register'])
  }
}
