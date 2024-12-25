import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
})
export class DisplayUsersComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '1 day ago'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'inactive',
      lastLogin: '1 week ago'
    },

  ];

  // Pagination
  currentPage = 1;
  entriesPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];
  startIndex = 0;
  endIndex = 0;

  // Search
  searchTerm = '';
  filteredUsers: User[] = [];

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.filteredUsers = [...this.users];
    this.totalItems = this.filteredUsers.length;
    this.calculatePagination();
    this.updateDisplayedUsers();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.entriesPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.startIndex = (this.currentPage - 1) * this.entriesPerPage;
    this.endIndex = Math.min(this.startIndex + this.entriesPerPage, this.totalItems);
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    const end = start + this.entriesPerPage;
    this.filteredUsers = this.users
      .filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice(start, end);
    this.totalItems = this.filteredUsers.length;
    this.calculatePagination();
  }

  onSearch() {
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }
}
