import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private getCatalogUrl: string = 'https://testologia.ru/tea'

  constructor(private http: HttpClient) {
  }

  getCatalog(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.getCatalogUrl)
  }
}
