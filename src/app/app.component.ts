import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsFilterService} from "./services/products-filter.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  searchTerm: string = '';

  constructor(private router: Router, private productsFilterService: ProductsFilterService) {
  }

  onSearch(): void {
    this.productsFilterService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/catalog']);
  }

}
