import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CourseListModule } from './course-list/course-list.module';
import { AuthService } from './services';
import { AuthModule } from './auth/auth.module';
import { routing } from './app.routing';
import { NoContentComponent } from './no-content/no-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    routing,
    BrowserModule,
    CoreModule,
    CourseListModule,
    AuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
