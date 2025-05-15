import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {


  constructor(private router: Router) {}


onReturn(): void{
  console.log("is clicked")
  this.router.navigate(['/dashboard']);
}
}
