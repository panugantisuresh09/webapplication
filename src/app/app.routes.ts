import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { Dashboard } from './dashboard/dashboard';
import { DashboardOverview } from './dashboard/overview';
import { FinancePage } from './finance/finance';
import { Login } from './login/login';
import { OrdersPage } from './orders/orders';
import { CatalogPage } from './catalog/catalog';
import { VendorsPage } from './vendors/vendors';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Sign in' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardOverview, title: 'Dashboard' },
      { path: 'vendors', component: VendorsPage, title: 'Vendors' },
      { path: 'catalog', component: CatalogPage, title: 'Catalog' },
      { path: 'orders', component: OrdersPage, title: 'Orders' },
      { path: 'finance', component: FinancePage, title: 'Finance' },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
