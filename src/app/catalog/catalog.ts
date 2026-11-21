import { Component } from '@angular/core';
import records from './catalog.json';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrl: '../admin-data.css',
})
export class CatalogPage {
  readonly products = records;
}
