import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { AuthService } from './services';
import { AuthModule } from './auth/auth.module';
import { routing } from './app.routing';
import { NoContentComponent } from './no-content/no-content.component';
import { reducers, metaReducers } from './auth/store';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CoursesModule,
    AuthModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument()

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
