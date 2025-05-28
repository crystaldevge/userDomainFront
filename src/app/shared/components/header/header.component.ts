import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    
  }

logout(): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: "Do you want to log out?" }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.authService.logout(); // Clear the token
      this.router.navigate(['/login']); // Redirect to the login page
    }
  });
}

}
