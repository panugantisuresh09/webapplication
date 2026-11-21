import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthState {
  private authenticated = false;

  login(): void {
    this.authenticated = true;
  }

  logout(): void {
    this.authenticated = false;
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }
}

export const authGuard: CanActivateFn = () => {
  const authState = inject(AuthState);
  const router = inject(Router);
  return authState.isAuthenticated ? true : router.createUrlTree(['/login']);
};
