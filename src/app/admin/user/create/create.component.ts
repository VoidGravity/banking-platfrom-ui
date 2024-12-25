import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  user = {
    name: '',
    email: '',
    role: '',
    password: '',
    active: true
  };

  onSubmit() {
    console.log('User to create:', this.user);

  }
}
