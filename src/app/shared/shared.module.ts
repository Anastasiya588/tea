import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from "@angular/forms";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {FooterComponent} from './footer/footer.component';
import {ProductComponent} from "./product/product.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterLinkWithHref,
    RouterOutlet
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductComponent
  ]
})
export class SharedModule {
}
