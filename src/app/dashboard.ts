import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/* ---------- Layout shell (sidebar + topbar + outlet) ---------- */
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}

/* ---------- Mock data (replace with Spring Boot API later) ---------- */
interface StatCard {
  label: string;
  value: string;
  note: string;
  trend?: string; // e.g. "↑ 8.2%"
  icon: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: 'Confirmed' | 'Pending' | 'Shipped';
  time: string;
}

interface RecentTransaction {
  id: string;
  title: string;
  detail: string;
  amount: string;
  time: string;
}

/* ---------- Page used by every route ---------- */
@Component({
  selector: 'app-workspace-page',
  imports: [RouterLink],
  template: `
    <section class="workspace-page">
      <div class="workspace-heading">
        <div>
          <span class="workspace-kicker">COMMERCE &amp; SALES MANAGEMENT PLATFORM</span>
          <h1>{{ title() }}</h1>
          <p>{{ description() }}</p>
        </div>
        @if (isDashboard()) {
          <a routerLink="/orders" class="primary-action">Review orders <span>→</span></a>
        }
      </div>

      @if (isDashboard()) {
        <div class="overview-cards">
          @for (card of stats; track card.label) {
            <article class="overview-card">
              <span>{{ card.label }}</span>
              <strong>{{ card.value }}</strong>
              <small>
                @if (card.trend) {
                  <i>{{ card.trend }}</i>
                }
                {{ card.note }}
              </small>
              <b class="overview-icon">{{ card.icon }}</b>
            </article>
          }
        </div>

        <div class="dashboard-panels">
          <article class="content-card activity-panel">
            <div class="card-title">
              <div>
                <h2>Recent orders</h2>
                <p>Latest multi-vendor order activity</p>
              </div>
              <a routerLink="/orders">View all</a>
            </div>
            @for (order of recentOrders; track order.id) {
              <div class="activity-item">
                <span class="activity-mark order-mark">O</span>
                <div>
                  <strong>Order {{ order.id }} · {{ order.status }}</strong>
                  <small>{{ order.customer }} · {{ order.amount }}</small>
                </div>
                <time>{{ order.time }}</time>
              </div>
            }
          </article>

          <article class="content-card activity-panel">
            <div class="card-title">
              <div>
                <h2>Commission &amp; settlements</h2>
                <p>Latest finance activity</p>
              </div>
              <a routerLink="/finance">View finance</a>
            </div>
            @for (txn of recentTransactions; track txn.id) {
              <div class="activity-item">
                <span class="activity-mark payment-mark">$</span>
                <div>
                  <strong>{{ txn.title }}</strong>
                  <small>{{ txn.detail }} · {{ txn.amount }}</small>
                </div>
                <time>{{ txn.time }}</time>
              </div>
            }
          </article>
        </div>
      } @else {
        <article class="content-card section-placeholder">
          <span class="placeholder-mark">✦</span>
          <h2>{{ title() }}</h2>
          <p>{{ description() }}</p>
          <div class="placeholder-note">
            This section is ready for your {{ title().toLowerCase() }} data and workflows.
          </div>
        </article>
      }
    </section>
  `,
  styleUrl: './dashboard.css',
})
export class WorkspacePage {
  private readonly route = inject(ActivatedRoute);

  // Route data as a signal: updates automatically when the route changes.
  private readonly data = toSignal(this.route.data, { initialValue: {} as Record<string, string> });

  readonly title = computed(() => this.data()['title'] ?? 'Dashboard');
  readonly description = computed(
    () => this.data()['description'] ?? 'Manage your commerce workspace.',
  );
  readonly isDashboard = computed(() => this.title() === 'Dashboard');

  readonly stats: StatCard[] = [
    { label: 'Total sales (GMV)', value: '$2.48M', trend: '↑ 12.4%', note: 'from last month', icon: '↗' },
    { label: 'Commission revenue', value: '$186.4K', trend: '↑ 8.6%', note: 'from last month', icon: '◈' },
    { label: 'Active vendors', value: '1,284', trend: '↑ 5.2%', note: 'from last month', icon: '♙' },
    { label: 'Pending actions', value: '24', note: '8 require review today', icon: '◷' },
  ];

  readonly recentOrders: RecentOrder[] = [
    {
      id: '#ORD-2048',
      customer: 'Northwest Retail',
      amount: '$2,480.00',
      status: 'Confirmed',
      time: '1 hour ago',
    },
    {
      id: '#ORD-2047',
      customer: 'Brightline Supplies',
      amount: '$1,120.00',
      status: 'Pending',
      time: '3 hours ago',
    },
    {
      id: '#ORD-2046',
      customer: 'Harbor Foods',
      amount: '$3,905.50',
      status: 'Shipped',
      time: 'Yesterday',
    },
    {
      id: '#ORD-2045',
      customer: 'Summit Traders',
      amount: '$640.00',
      status: 'Confirmed',
      time: 'Yesterday',
    },
  ];

  readonly recentTransactions: RecentTransaction[] = [
    {
      id: 'T-9021',
      title: 'Payment received',
      detail: 'Order #ORD-2041',
      amount: '$1,860.00',
      time: '3 hours ago',
    },
    {
      id: 'T-9020',
      title: 'Settlement completed',
      detail: 'Weekly partner payout batch',
      amount: '$12,400.00',
      time: 'Yesterday',
    },
    {
      id: 'T-9019',
      title: 'Payment pending',
      detail: 'Order #ORD-2044',
      amount: '$975.00',
      time: 'Yesterday',
    },
    {
      id: 'T-9018',
      title: 'Refund issued',
      detail: 'Order #ORD-2030',
      amount: '$210.00',
      time: '2 days ago',
    },
  ];
}
