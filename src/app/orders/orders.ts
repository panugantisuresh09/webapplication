import { Component } from '@angular/core';
import records from './orders.json';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrl: '../admin-data.css',
})
export class OrdersPage {
  readonly orders = records;
}
