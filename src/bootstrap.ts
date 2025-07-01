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
    console.warn(`[mount] Element with id "${containerId}" not found, falling back to document.body`);
 
    // fallback: create <app-root> directly inside body
    const fallbackRoot = document.createElement('app-root');
    document.body.appendChild(fallbackRoot);
 
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
 
    return;
  }
 
  if (!container.querySelector('app-root')) {
    const appRoot = document.createElement('app-root');
    container.appendChild(appRoot);
  }
 
  console.log('Bootstrapping Angular into #' + containerId);
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
 
// ✅ ლოკალური სტარტის შემთხვევაში auto-mount
if (window.location.hostname === 'user.local.dev.ge' && !document.getElementById('app-dashboard')) {
  mount('body'); // fallback fallback mount
}
 
export default { mount };