import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent]
})
export class CoreModule { }
