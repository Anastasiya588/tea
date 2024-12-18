import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../types/product.type";
import {GetProductsService} from "../../shared/services/get-products.service";
import {ProductsFilterService} from "../../shared/services/products-filter.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog: ProductType[] = [];
  title: string = 'Наши чайные коллекции';
  searchTerm: string = '';
  constructor(private getProductsService: GetProductsService, private productsFilterService: ProductsFilterService) {
  }

  ngOnInit() {

    this.productsFilterService.currentSearch$.subscribe(term => {
      this.searchTerm = term; // сохраняем текущий поисковый термин
      this.title = term ? `Результаты поиска по запросу "${term}"` : 'Наши чайные коллекции';
      this.fetchProducts(term);
    });

    this.getAllTeas();
  }
  fetchProducts(term: string): void {
    if (term) {
      this.productsFilterService.searchTeas(term).subscribe(res => {
        this.catalog = res.length > 0 ? res : [];
      });
    } else {
      this.getAllTeas();
    }
  }
  getAllTeas(): void {
    this.getProductsService.getCatalog().subscribe(res => {
      this.catalog = res;
    });
  }

}
