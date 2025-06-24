import '@angular/compiler';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './styles.scss';

/**
 * Mount Angular into a custom element or fallback to default <app-root>
 */
function mount(selector: string = 'app-dashboard') {
  if (!document.querySelector(selector)) {
    const el = document.createElement(selector);
    document.body.appendChild(el);
  }

  platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  }).catch(err => console.error(err));
}

// For local dev mode
if (document.querySelector('app-root')) {
  mount('app-root');
}


export default { mount };