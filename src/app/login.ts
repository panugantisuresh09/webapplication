import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = 'admin@commerce.com';
  password = 'Admin@123';
  rememberMe = false;
  passwordVisible = false;
  message = '';

  private readonly demoUsername = 'admin@commerce.com';
  private readonly demoPassword = 'Admin@123';

  constructor(private readonly router: Router) {}

  fillDemo(): void {
    this.username = this.demoUsername;
    this.password = this.demoPassword;
    this.message = '';
  }

  submitLogin(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (
      this.username.trim().toLowerCase() !== this.demoUsername ||
      this.password !== this.demoPassword
    ) {
      this.message = 'Incorrect username or password. Please try again.';
      return;
    }
    this.message = '';
    void this.router.navigate(['/dashboard']);
  }
}
