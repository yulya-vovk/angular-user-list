import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class AppComponent {
  title = 'user-list-app';

  users: User[] = [
    { id: 1, name: 'Анна', email: 'anna@example.com', active: true },
    { id: 2, name: 'Борис', email: 'boris@example.com', active: false },
    { id: 3, name: 'Светлана', email: 'sveta@example.com', active: true },
    { id: 4, name: 'Дмитрий', email: 'dmitry@example.com', active: true },
    { id: 5, name: 'Елена', email: 'elena@example.com', active: false }
  ];

  searchTerm = '';
  filterStatus: 'all' | 'active' | 'inactive' = 'all';
  selectedUser: User | null = null;

  get filteredUsers(): User[] {
    return this.users
      .filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .filter(user => {
        if (this.filterStatus === 'active') return user.active;
        if (this.filterStatus === 'inactive') return !user.active;
        return true;
      });
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }
}