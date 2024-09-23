import { isDevMode } from '@angular/core';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  // With  standalone API,
  providers: [
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
  ],
   imports: [
        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
};
