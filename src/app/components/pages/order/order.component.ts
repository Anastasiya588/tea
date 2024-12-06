import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {OrderResponseInterface} from "../../../interfaces/order-response.interface";
import {ActivatedRoute} from "@angular/router";
import { of } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  orderSuccess: boolean = false;
  orderError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.orderForm = this.fb.group({
      Product: [{value: '', disabled: true}, Validators.required],
      Name: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
      Surname: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/), this.phoneValidator]],
      Country: ['', Validators.required],
      Index: ['', Validators.required],
      Address: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9\s\-\/]+$/)]],
      Comment: ['']
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.get('Product')?.setValue(params['product']);
      }
    });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value ? control.value.replace(/\+/g, '') : '';
    if (value && value.length !== 11) {
      return {phoneInvalid: true};
    }
    return null;
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isLoading = true;
      const orderData = {
        name: this.orderForm.value.Name,
        last_name: this.orderForm.value.Surname,
        phone: this.orderForm.value.Phone,
        country: this.orderForm.value.Country,
        zip: this.orderForm.value.Index,
        product: this.orderForm.get('Product')?.value,
        address: this.orderForm.value.Address,
        comment: this.orderForm.value.Comment
      };

      this.http.post<OrderResponseInterface>('https://testologia.ru/order-tea', orderData)
        .pipe(
          tap(() => {
            this.isLoading = false;
          }),
          switchMap((response: OrderResponseInterface) => {
            if (response.success === 1) {
              this.orderSuccess = true;
              this.orderError = false;
              this.orderForm.reset();
              return of(null);
            } else {
              this.orderError = true;
              this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
              return of(null).pipe(delay(3000));
            }
          }),
          tap(() => {
            this.orderError = false;
          }),
          catchError(err => {
            this.isLoading = false;
            console.error('Ошибка при отправке данных:', err);
            this.orderSuccess = false;
            this.orderError = true;
            this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
            return of(null).pipe(delay(3000));
          })
        )
        .subscribe();
    } else {
      this.orderError = true;
      this.errorMessage = 'Пожалуйста, исправьте ошибки в форме.';
      of(null).pipe(delay(3000)).subscribe(() => {
        this.orderError = false;
      });
    }
  }
}
