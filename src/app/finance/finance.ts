import { Component } from '@angular/core';
import records from './finance.json';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.html',
  styleUrl: '../admin-data.css',
})
export class FinancePage {
  readonly settlements = records;
}
