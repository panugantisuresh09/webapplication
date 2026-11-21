import { Component } from '@angular/core';
import records from './vendors.json';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.html',
  styleUrl: '../admin-data.css',
})
export class VendorsPage {
  readonly vendors = records;
}
