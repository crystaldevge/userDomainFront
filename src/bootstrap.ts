import '@angular/compiler';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './styles.scss';

/**
 * Mount Angular into a custom element or fallback to default <app-root>
 */
function mount(containerId: string = 'app-dashboard') {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`[mount] Element with id "${containerId}" not found`);
    return;
  }

  if (!container.querySelector('app-root')) {
    const appRoot = document.createElement('app-root');
    container.appendChild(appRoot);
  }

  console.log('Bootstrapping Angular...');
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}


// For local dev mode
// if (document.querySelector('app-root')) {
//   mount('app-root');
// }


export default { mount };