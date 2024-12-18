import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {OrderComponent} from "./order.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule {
}
