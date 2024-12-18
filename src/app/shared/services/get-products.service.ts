import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../types/product.type";

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
