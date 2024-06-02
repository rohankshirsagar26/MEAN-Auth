import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        alert(
          `${res.data.firstName} ${res.data.lastName} logged in successfully`
        );
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
