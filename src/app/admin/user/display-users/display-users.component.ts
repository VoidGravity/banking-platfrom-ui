import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
})
export class DisplayUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];



  currentPage = 1;
  entriesPerPage = 4;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];
  startIndex = 0;
  endIndex = 0;


  searchTerm = '';

  constructor(private userService: UserService) {}



  ngOnInit() {
    this.fetchUsers();
  }



  fetchUsers() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = [...this.users];
        this.totalItems = this.filteredUsers.length;
        this.calculatePagination();
        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error(error);
      },

    });
  }





  deleteUser(id?: number) {
    if (!id) {
      console.error("Invalid user ID:", id);
      return;
    }

    this.userService.delete(id).subscribe({
      next: (response) => {
        console.log(response);
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
        this.totalItems = this.filteredUsers.length;
        this.calculatePagination();
        this.fetchUsers();
      },
      error: (error) => {
        console.error("errrrorrrr" , error);
      },
    });
  }






  desactiveUser(id?: number) {
    if (!id) {
      console.error("Invalid user ID:", id);
      return;
    }

    this.userService.desactiveUser(id).subscribe({
      next:(response) =>{
        console.log(response);
        this.fetchUsers();
      },
      error:(error) =>{
        console.error("errrrorrrr" , error);
      }

    })
  }





  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.entriesPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.startIndex = (this.currentPage - 1) * this.entriesPerPage;
    this.endIndex = Math.min(this.startIndex + this.entriesPerPage, this.filteredUsers.length);
  }






  updateDisplayedUsers() {
    this.startIndex = (this.currentPage - 1) * this.entriesPerPage;
    this.endIndex = Math.min(this.startIndex + this.entriesPerPage, this.totalItems);

    this.filteredUsers = this.users
      .filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice(this.startIndex, this.endIndex);
  }






  onSearch() {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
