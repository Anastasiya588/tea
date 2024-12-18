import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../types/product.type";
import {GetProductsService} from "../services/get-products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: ProductType | undefined;

  constructor(private route: ActivatedRoute,
              private getProductsService: GetProductsService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductsService.getCatalog().subscribe((catalog: ProductType[]) => {
      this.product = catalog.find((tea: ProductType): boolean => tea.id === id);
    });
  }

  buyProduct() {
    if (this.product) {
      this.router.navigate(['/order'], { queryParams: { product: this.product.title } })
        .then(success => {
        })
        .catch(error => {
          console.error('Navigation error:', error);
        });
     }
  }

}
