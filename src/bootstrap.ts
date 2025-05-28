import '@angular/compiler'
import 'zone.js';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import './styles.scss'; 

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
