import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  register() {
    this.auth.register(this.registrationForm.value).subscribe({
      next: (res) => {
        alert(
          `${res.data.firstName} ${res.data.lastName} registered successfully`
        );
        this.registrationForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
