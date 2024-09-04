import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import * as tenantInfo from './auth.tenant';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAuth0({
      domain: tenantInfo.DEV.domain,
      clientId: tenantInfo.DEV.clientID,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
