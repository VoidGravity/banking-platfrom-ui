import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.credentials.username, this.credentials.password).subscribe(
      (response: { token: string; role: string; username: string }) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username);
          if (response.role === 'USER') {
           // this.router.navigate(['/dashboard/account-for-user']);
            console.log('User logged in');
          } else if (response.role === 'EMPLOYEE') {
            this.router.navigate(['/dashboard/manage-transactions']);
          } else if (response.role === 'ADMIN') {
            this.router.navigate(['/admin/users']);
          }
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('login error:', error);
      }
    );
  }
}
