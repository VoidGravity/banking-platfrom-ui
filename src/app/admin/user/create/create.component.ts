import { Component } from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  user = {
    username: '',
    email: '',
    role: '',
    password: '',
    active: true
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    console.log('User to create:', this.user);

    this.userService.create(this.user).subscribe({
      next: (response) => {
        console.log('User created:', response);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }

    })

  }
}
