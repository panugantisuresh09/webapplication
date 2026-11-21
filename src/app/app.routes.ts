import { Routes } from '@angular/router';
import { Dashboard, WorkspacePage } from './dashboard';
import { Login } from './login';

const page = (path: string, title: string, description: string) => ({
  path,
  component: WorkspacePage,
  data: { title, description },
});

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Sign in' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: Dashboard,
    children: [
      page(
        'dashboard',
        'Dashboard',
        'High-level overview of sales GMV, commission revenue, active vendors, and pending actions.',
      ),
      page(
        'vendors',
        'Vendors',
        'Seller onboarding, KYC and tax verification, account approvals, and vendor performance tracking.',
      ),
      page(
        'catalog',
        'Catalog',
        'Product listing approvals, category mapping, brand management, and global inventory rules.',
      ),
      page(
        'orders',
        'Orders',
        'Multi-vendor order tracking, split-shipment monitoring, cancellations, returns, and disputes.',
      ),
      page(
        'finance',
        'Finance',
        'Commission rate configuration, automated vendor payouts, tax and GST invoicing, and settlement reports.',
      ),
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
