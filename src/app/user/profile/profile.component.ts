import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
 templateUrl: `profile.component.html`,
})
export class ProfileComponent implements OnInit {
  profile = {
    name: 'John Doe',
    accountId: '****3456',
    avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
    balance: '45,250.75',
    savings: '28,450.00',
    creditScore: 785,
    accountType: 'Premium Checking',
    branch: 'Downtown Financial Center',
    openingDate: 'January 15, 2020',
    status: 'Active',
    recentTransactions: [
      {
        type: 'debit',
        description: 'Amazon Purchase',
        amount: '89.99',
        date: 'Today, 2:45 PM'
      },
      {
        type: 'credit',
        description: 'Salary Deposit',
        amount: '5,250.00',
        date: 'Yesterday, 9:00 AM'
      },
      {
        type: 'debit',
        description: 'Restaurant Payment',
        amount: '125.30',
        date: 'Dec 24, 7:30 PM'
      },
      {
        type: 'credit',
        description: 'Investment Return',
        amount: '1,250.00',
        date: 'Dec 23, 3:15 PM'
      }
    ],
    quickActions: [
      {
        name: 'Transfer',
        icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
      },
      {
        name: 'Pay Bills',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
      },
      {
        name: 'Investments',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      },
      {
        name: 'Cards',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
      }
    ]
  };

  ngOnInit() {

  }
}
