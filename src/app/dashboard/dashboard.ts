import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthState } from '../auth.guard';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private readonly authState: AuthState,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authState.logout();
    void this.router.navigate(['/login']);
  }
}
