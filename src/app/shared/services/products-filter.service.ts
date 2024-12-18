import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {
  private searchSubject = new BehaviorSubject<string>('');
  currentSearch$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  searchTeas(query: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`https://testologia.ru/tea`, {params: {search: query}});
  }

  clearSearch(): void {
    this.searchSubject.next('');
  }
}
