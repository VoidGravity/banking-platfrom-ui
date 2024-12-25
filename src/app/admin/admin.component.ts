import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  constructor() { }
}
