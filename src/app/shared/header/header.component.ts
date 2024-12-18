import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsFilterService} from "../services/products-filter.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  searchTerm: string = '';

  constructor(private router: Router, private productsFilterService: ProductsFilterService) {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.productsFilterService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/catalog']).then();
  }
}
