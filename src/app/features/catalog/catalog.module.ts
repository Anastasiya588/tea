import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from "../../app-routing.module";
import {CatalogComponent} from "./catalog.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    CatalogComponent
  ]
})
export class CatalogModule { }
