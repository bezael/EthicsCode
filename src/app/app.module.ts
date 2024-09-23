import localeEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductEffects } from './features/products/state/products.effects';
import { productsReducer } from './features/products/state/products.reducers';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    StoreModule.forRoot({ products: productsReducer, router: routerReducer }),
    EffectsModule.forRoot([ProductEffects]),
    environment.imports,
  ],
  bootstrap: [AppComponent],
  providers: [
    // provideHttpClient(withFetch()),
    // provideRouterStore(),
    // provideEffects([ProductEffects]),
  ],
})
export class AppModule {}
