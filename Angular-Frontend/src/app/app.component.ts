import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {icons} from './Icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const icon of icons) {
      iconRegistry.addSvgIcon(icon.selector,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path));
    }
  }
  // Active Link
  activeLink(event): void {
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace('active', '');
    if (event.target.tagName === 'IMG') {
      document.querySelectorAll('a').item(1).className += 'active';
    } else {
      event.target.className += 'active';
    }
  }
}
