import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-overview',
  imports: [RouterLink],
  template: `
    <section class="workspace-page">
      <div class="workspace-heading">
        <div>
          <span class="workspace-kicker">COMMERCE &amp; SALES MANAGEMENT PLATFORM</span>
          <h1>Dashboard</h1>
          <p>High-level overview of platform performance and pending actions.</p>
        </div>
        <a routerLink="/orders" class="primary-action">Review orders <span>→</span></a>
      </div>
      <div class="overview-cards">
        @for (card of stats; track card.label) {
          <article class="overview-card">
            <span>{{ card.label }}</span><strong>{{ card.value }}</strong>
            <small
              ><i>{{ card.trend }}</i> {{ card.note }}</small
            ><b class="overview-icon">{{ card.icon }}</b>
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
                <strong>Order {{ order.id }} · {{ order.status }}</strong
                ><small>{{ order.customer }} · {{ order.amount }}</small>
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
          @for (item of financeActivity; track item.id) {
            <div class="activity-item">
              <span class="activity-mark payment-mark">$</span>
              <div>
                <strong>{{ item.title }}</strong
                ><small>{{ item.detail }} · {{ item.amount }}</small>
              </div>
              <time>{{ item.time }}</time>
            </div>
          }
        </article>
      </div>
    </section>
  `,
  styleUrl: './dashboard.css',
})
export class DashboardOverview {
  readonly stats = [
    {
      label: 'Total sales (GMV)',
      value: '$2.48M',
      trend: '↑ 12.4%',
      note: 'from last month',
      icon: '↗',
    },
    {
      label: 'Commission revenue',
      value: '$186.4K',
      trend: '↑ 8.6%',
      note: 'from last month',
      icon: '◈',
    },
    {
      label: 'Active vendors',
      value: '1,284',
      trend: '↑ 5.2%',
      note: 'from last month',
      icon: '♙',
    },
    { label: 'Pending actions', value: '24', trend: '8', note: 'require review today', icon: '◷' },
  ];

  readonly recentOrders = [
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
  ];

  readonly financeActivity = [
    {
      id: 'T-9021',
      title: 'Commission recorded',
      detail: 'Order #ORD-2041',
      amount: '$1,860.00',
      time: '3 hours ago',
    },
    {
      id: 'T-9020',
      title: 'Settlement completed',
      detail: 'Weekly payout batch',
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
  ];
}
