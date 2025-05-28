import '@angular/compiler'
import 'zone.js';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import './styles.scss'; 

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})

export function mount() {
  platformBrowser().bootstrapModule(AppModule).then(ref => {
    
        platformBrowser().bootstrapModule(AppModule, {
            ngZoneEventCoalescing: true,
       })

        .catch(err => console.error(err));
    // Inject Angular app into the target element
  });
}


  
